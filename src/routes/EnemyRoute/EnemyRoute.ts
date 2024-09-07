// Dependencies
import express from 'express';

//Services
import { getEnemiesByMission } from '../../services/enemy/EnemyService';

// Custom error
import { errorHandler } from '../../config/CustomError';

// Helpers
import { verifyToken } from '../../helpers/Token';

const router = express.Router();

router.get("/:missionId", verifyToken, async (req, res) => {
    try {
        const response = await getEnemiesByMission(Number(req.params.missionId));
        res.status(200).json(response);
    } catch(error) {
        errorHandler(error, res);
    }
})

module.exports = router;