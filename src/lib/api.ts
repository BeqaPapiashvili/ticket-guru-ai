const API_URL = 'http://localhost:5000/api';

export const api = {
  async getTickets() {
    const response = await fetch(`${API_URL}/tickets`);
    if (!response.ok) throw new Error('Failed to fetch tickets');
    return response.json();
  },

  async createTicket(ticketData: any) {
    const response = await fetch(`${API_URL}/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    });
    if (!response.ok) throw new Error('Failed to create ticket');
    return response.json();
  },

  async updateTicketStatus(ticketId: string, status: string) {
    const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update ticket');
    return response.json();
  },

  async getStats() {
    const response = await fetch(`${API_URL}/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },
};