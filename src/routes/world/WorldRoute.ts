// Dependencies
import express from 'express';

//Services
import { getWorlds } from '../../services/world/WorldService';
import { getMissionByWorld } from '../../services/mission/MissionService';

// Custom error
import { errorHandler } from '../../config/CustomError';

// Helpers
import { verifyToken } from '../../helpers/Token';

const router = express.Router();

router.get("/", verifyToken, async (req,res) => {
    try {
        const response = await getWorlds();
        res.status(200).json(response);
    } catch (error) {
        errorHandler(error, res);
    }
})

router.get("/:worldId", verifyToken, async (req, res) => {
    try {
        const response = await getMissionByWorld(Number(req.params.worldId));
        res.status(200).json(response);
    } catch (error) {
        errorHandler(error, res);
    }
})

module.exports = router;