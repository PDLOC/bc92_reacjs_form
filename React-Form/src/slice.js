import { createSlice } from "@reduxjs/toolkit"

const getLocalStorage = () => {
    const getItem = localStorage.getItem("students");
    const data = JSON.parse(getItem);
    return data;
}

const initialState = {
    student: {
        maSV: "",
        hoTen: "",
        phone: "",
        email: "",
    },
    listStudents: getLocalStorage(),
    keyword: "",
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
            localStorage.setItem("students", JSON.stringify(updateList));
        },

        updateStudent: (state, action) => {
            const student = action.payload;
            const index = state.listStudents.findIndex((item) => item.maSV === student.maSV);
            const updateList = [...state.listStudents];
            if (index !== -1) {
                updateList[index] = student;
                state.listStudents = updateList;
            }
            localStorage.setItem("students", JSON.stringify(updateList));

        },
        removeStudent: (state, action) => {
            const { maSV } = action.payload;
            console.log(maSV);
            const updateList = [...state.listStudents].filter((item) => item.maSV !== maSV);
            state.listStudents = updateList;
            localStorage.setItem("students", JSON.stringify(updateList));
        },

        searchStudent: (state, action) => {
            state.keyword = action.payload;
        }
    }
});

export const { createStudent, updateStudent, updateField, removeStudent, searchStudent } = ReactFormSlice.actions;


export default ReactFormSlice.reducer;