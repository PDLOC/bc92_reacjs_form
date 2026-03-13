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
    createError: {
        maSV: "",
        hoTen: "",
        phone: "",
        email: "",
    },
    studentEditing: null,
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
            const isExist = updateList.find(item => item.maSV === student.maSV);
            if (isExist) {
                state.createError = {
                    ...state.createError,
                    maSV: "Mã sinh viên đã tồn tại",
                }
                return;
            }

            if (student.hoTen.trim() === "" || student.phone.trim() === "" || student.email.trim() === "" || student.maSV.trim() === "") {
                state.createError = {
                    ...state.createError,
                    maSV: "Vui lòng không để trống mã sinh viên",
                    hoTen: "Vui lòng không để trống họ tên",
                    phone: "Vui lòng không để trống số điện thoại",
                    email: "Vui lòng không để trống email",
                }
                return;
            }

            updateList.push(student);
            state.listStudents = updateList;
            localStorage.setItem("students", JSON.stringify(updateList));
        },

        editStudent: (state, action) => {
            const masv = action.payload;
            const updateList = [...state.listStudents];
            const index = updateList.find(item => item.maSV === masv);
            state.studentEditing = index;
        },

        updateStudent: (state, action) => {
            const student = action.payload;
            const updateList = [...state.listStudents];
            const index = updateList.findIndex((item) => item.maSV === student.maSV);
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
        },
        checkValidation: (state, action) => {
            const student = action.payload;

            const field = student.name;
            let callName = "";
            if (field === "maSV") {
                callName = "mã sinh viên"
            } else if (field === "hoTen") {
                callName = "họ tên"
            } else if (field === "phone") {
                callName = "số điện thoại"
            } else if (field === "email") {
                callName = "email"
            }
            let mess = student.value.trim() === "" ? `Vui lòng không để trống ${callName}` : "";

            switch (student.form) {
                case "create":
                    state.createError = {
                        ...state.createError,
                        [student.name]: mess,
                    };
                    break;
                default:
                    break;
            }
        },

    }
});

export const { createStudent, editStudent, updateStudent, updateField, removeStudent, searchStudent, checkValidation } = ReactFormSlice.actions;


export default ReactFormSlice.reducer;