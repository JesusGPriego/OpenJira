import mongoose, { MongooseError } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Id not valid' });
  }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res);
    case 'GET':
      return getEntry(req, res);
    case 'DELETE':
      return deleteEntry(req, res);
    default:
      return res.status(400).json({ message: 'Method not valid' });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const entryToUpdate = await Entry.findById(id);
  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: 'Entry id not found' });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedEntry!);
    await db.disconnect();
  } catch (error: any) {
    await db.disconnect();
    return res.status(400).json({ message: error.error.erros.status.message });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const entryMatchingId = await Entry.findById(id);
  if (!entryMatchingId) {
    await db.disconnect();
    return res.status(400).json({ message: 'Entry id not found' });
  }
  await db.disconnect();
  return res.status(200).json(entryMatchingId);
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();

  const deletedEntry = await Entry.findByIdAndDelete(id);

  if (!deletedEntry) {
    await db.disconnect();
    return res.status(400).json({ message: 'Entry id not found' });
  }
  await db.disconnect();
  return res.status(200).json(deletedEntry);
};
