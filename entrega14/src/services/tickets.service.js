import configs from "../config.js";
import { Tickets } from "../dao/factory.js";
import { v4 as uuidv4 } from "uuid";
import { __dirname } from "../utils.js";
import TicketsRepository from "../repository/tickets.repository.js";

const TicketsDao =
  configs.persistence === "FS"
    ? new Tickets(`${__dirname}/dao/fileManagers/files/tickets.json`)
    : new Tickets();
const manager = new TicketsRepository(TicketsDao);

const getTicketsService = async () => {
  const tickets = await manager.getAllRepository();
  return tickets;
};

const getTicketService = async (code) => {
  const ticket = await manager.getOneRepository(code);
  return ticket;
};

const createTicketService = async (user, amount) => {
  const newTicket = await manager.addRepository(user, amount);
  return newTicket;
};

const uptadeTicketService = async (code, ticket) => {
  const newTicket = await manager.uptadeRepository(code, ticket);
  return newTicket;
};

const deleteTicketService = async (code) => {
  const tickets = await manager.deleteRepository(code);
  return tickets;
};

export {
  getTicketsService,
  getTicketService,
  createTicketService,
  uptadeTicketService,
  deleteTicketService,
};
