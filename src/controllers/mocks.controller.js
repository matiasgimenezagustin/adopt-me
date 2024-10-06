import MockingService from '../services/mocking.service.js';
import { CustomError, errorDictionary, handleError } from '../utils/errorHandler.js';

const getMockingPets = async (req, res) => {
    try {
        const pets = MockingService.generatePets(100); // Generar 100 mascotas
        res.status(200).json({ status: 'success', payload: pets });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error generating mock pets' });
    }
};

const getMockingUsers = async (req, res) => {
    try {
        const users = await MockingService.generateUsers(50);
        res.status(200).json({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error generating mock users' });
    }
};

const generateData = async (req, res) => {
    const { users, pets } = req.body;
    try {
        if (!users || !pets) {
            throw new CustomError(
                errorDictionary.MISSING_PARAMETERS.code,
                errorDictionary.MISSING_PARAMETERS.message,
                'users and pets are required'
            );
        }
        if (typeof users !== 'number' || typeof pets !== 'number') {
            throw new CustomError(
                errorDictionary.VALIDATION_ERROR.code,
                errorDictionary.VALIDATION_ERROR.message,
                'users and pets must be numbers'
            );
        }

        const generatedUsers = await MockingService.generateAndInsertUsers(users);
        const generatedPets = await MockingService.generateAndInsertPets(pets);

        res.status(200).send({
            status: 'success',
            message: 'Mock data generated successfully',
            data: { users: generatedUsers, pets: generatedPets }
        });
    } catch (error) {

        handleError(error, res);
    }
};

export default {
    getMockingPets,
    getMockingUsers,
    generateData
};
