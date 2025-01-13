const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const dataFilePath = path.join(__dirname, 'data', 'tickets.json');

// Ensure data directory exists
const ensureDataFile = async () => {
  try {
    await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
    try {
      await fs.access(dataFilePath);
    } catch {
      await fs.writeFile(dataFilePath, JSON.stringify({ tickets: [] }));
    }
  } catch (error) {
    console.error('Error initializing data file:', error);
  }
};

ensureDataFile();

// Get all tickets
app.get('/api/tickets', async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    const { tickets } = JSON.parse(data);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error reading tickets' });
  }
});

// Create a new ticket
app.post('/api/tickets', async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    const { tickets } = JSON.parse(data);
    
    const newTicket = {
      ...req.body,
      id: `T-${Math.floor(Math.random() * 1000)}`,
      created_at: new Date().toISOString()
    };
    
    tickets.push(newTicket);
    await fs.writeFile(dataFilePath, JSON.stringify({ tickets }, null, 2));
    
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Error creating ticket' });
  }
});

// Update ticket status
app.patch('/api/tickets/:id', async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    let { tickets } = JSON.parse(data);
    
    const ticketIndex = tickets.findIndex(t => t.id === req.params.id);
    if (ticketIndex === -1) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    
    tickets[ticketIndex] = {
      ...tickets[ticketIndex],
      ...req.body,
      completed_at: req.body.status === 'resolved' ? new Date().toISOString() : tickets[ticketIndex].completed_at
    };
    
    await fs.writeFile(dataFilePath, JSON.stringify({ tickets }, null, 2));
    res.json(tickets[ticketIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Error updating ticket' });
  }
});

// Get ticket statistics
app.get('/api/stats', async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    const { tickets } = JSON.parse(data);
    
    const activeTickets = tickets.filter(t => !['resolved', 'closed'].includes(t.status)).length;
    const resolvedTickets = tickets.filter(t => ['resolved', 'closed'].includes(t.status)).length;
    
    // Calculate average resolution time
    const resolvedWithTime = tickets.filter(t => t.status === 'resolved' && t.completed_at);
    let avgResolutionTime = 0;
    
    if (resolvedWithTime.length > 0) {
      const totalTime = resolvedWithTime.reduce((acc, ticket) => {
        const start = new Date(ticket.created_at).getTime();
        const end = new Date(ticket.completed_at).getTime();
        return acc + (end - start);
      }, 0);
      avgResolutionTime = (totalTime / resolvedWithTime.length) / (1000 * 60 * 60); // Convert to hours
    }
    
    // Calculate daily stats for the last 7 days
    const last7Days = Array.from({length: 7}, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();
    
    const dailyStats = last7Days.map(date => {
      const count = tickets.filter(t => 
        t.created_at.startsWith(date)
      ).length;
      return { date, count };
    });

    res.json({
      activeTickets,
      resolvedTickets,
      avgResolutionTime: avgResolutionTime.toFixed(1),
      dailyStats
    });
  } catch (error) {
    res.status(500).json({ error: 'Error getting statistics' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});