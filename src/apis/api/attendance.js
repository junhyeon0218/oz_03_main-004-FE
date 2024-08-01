import { authInstance } from '../utils/instance';

export const attendanceAPI = {
    getAttendanceRecords: async () => {
        const { data } = await authInstance.get('/attendances/');
        return data;
    },

    markAttendance: async () => {
        const { data } = await authInstance.post('/attendances/increment/');
        return data;
    },

    purchaseItem: async () => {
        const { data } = await authInstance.post('/attendances/decrement/');
        return data;
    },
};
