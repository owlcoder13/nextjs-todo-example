import nextConnect from 'next-connect';
import database from '../models/connection';

export default function getHandler() {
    const handler = nextConnect();
    handler.use(database)
    return handler;
}