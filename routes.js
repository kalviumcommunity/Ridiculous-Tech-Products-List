const express = require('express');
const { ObjectId } = require('mongodb');

const router = express.Router();

module.exports = (db) => {
    const collection = db.collection('items');

    // Create Item
    router.post('/items', async (req, res) => {
        try {
            const result = await collection.insertOne(req.body);
            res.status(201).json({ message: '✅ Item created', item: { _id: result.insertedId, ...req.body } });
        } catch (error) {
            res.status(500).json({ error: '❌ Error creating item: ' + error.message });
        }
    });

    // Read All Items
    router.get('/items', async (req, res) => {
        try {
            const items = await collection.find().toArray();
            if (!items.length) {
                return res.status(404).json({ message: '⚠️ No items found' });
            }
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ error: '❌ Error fetching items: ' + error.message });
        }
    });

    // Read Single Item by ID
    router.get('/items/:id', async (req, res) => {
        try {
            if (!ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ error: '⚠️ Invalid ID format' });
            }

            const item = await collection.findOne({ _id: new ObjectId(req.params.id) });
            if (!item) {
                return res.status(404).json({ message: '❌ Item not found' });
            }
            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ error: '❌ Error fetching item: ' + error.message });
        }
    });

    // Update Item
    router.put('/items/:id', async (req, res) => {
        try {
            if (!ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ error: '⚠️ Invalid ID format' });
            }

            const result = await collection.updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: req.body }
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({ message: '❌ Item not found' });
            }
            res.status(200).json({ message: '✅ Item updated', result });
        } catch (error) {
            res.status(500).json({ error: '❌ Error updating item: ' + error.message });
        }
    });

    // Delete Item
    router.delete('/items/:id', async (req, res) => {
        try {
            if (!ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ error: '⚠️ Invalid ID format' });
            }

            const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: '❌ Item not found' });
            }
            res.status(200).json({ message: '✅ Item deleted' });
        } catch (error) {
            res.status(500).json({ error: '❌ Error deleting item: ' + error.message });
        }
    });

    return router;
};
