import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    student: {
        maSV: "",
        hoTen: "",
        phone: "",
        email: "",
    },
    listStudents: [],
}

const ReactFormSlice = createSlice({
    name: "ReactFormSlice",
    initialState,
    reducers: {
        updateField: (state, action) => {
            const { name, value } = action.payload;
            state.student = {
                ...state.student,
                [name]: value
            }
        },

        createStudent: (state, action) => {
            const student = action.payload;
            const updateList = [...state.listStudents];
            updateList.push(student);
            state.listStudents = updateList;
        },

        removeStudent: (state, action) => {
            const { maSV } = action.payload;
            const updateList = [...state.listStudents];
            updateList.splice(maSV, 1);
            state.listStudents = updateList;
        }

    }
});

export const { createStudent, updateField, removeStudent } = ReactFormSlice.actions;
export default ReactFormSlice.reducer;