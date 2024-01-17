import fs from "fs";
import { v4 as uuidv4 } from "uuid";
export default class TicketsFS {
  constructor(path) {
    this.path = path;
  }

  getAll = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const tickets = JSON.parse(data);
      return tickets;
    } else {
      return [];
    }
  };

  getOne = async (code) => {
    const tickets = await this.getAll();
    const find = tickets.find((t) => t.code == JSON.stringify(code));
    if (!find) {
      console.log(`no hemos encontrado el ticket con el code ${id}`);
    } else {
      return find;
    }
  };

  create = async (user, amount) => {
    const tickets = await this.getAll();
    const newTicket = {
      code: uuidv4(),
      purchase_datetime: new Date().toLocaleString(),
      amount,
      purchaser: user.email,
    };
    tickets.push(newTicket);
    await fs.promises.writeFile(this.path, JSON.stringify(tickets, null, "\t"));
    return newTicket;
  };

  uptade = async (code, newTicket) => {
    const tickets = await this.getAll();
    const index = tickets.findIndex((t) => t.code == code);
    tickets[index] = newTicket;
    await fs.promises.writeFile(this.path, JSON.stringify(tickets, null, "\t"));
    return newTicket;
  };

  delete = async (code) => {
    const tickets = await this.getAll();
    const index = tickets.findIndex((t) => t.code == code);
    tickets.splice(index, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(tickets, null, "\t"));
    return tickets;
  };
}
