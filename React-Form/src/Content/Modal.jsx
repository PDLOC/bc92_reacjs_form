import { useDispatch, useSelector } from "react-redux";
import { updateStudent } from "../slice"
import { useState, useEffect } from "react"

export default function Modal({ listStudents, closeModal, openModal }) {
    const { studentEditing } = useSelector(state => state.reactFormReducer);
    const dispatch = useDispatch();
    const [student, setStudent] = useState({
        maSV: "",
        hoTen: "",
        phone: "",
        email: ""
    });

    useEffect(() => {
        if (studentEditing) {
            setStudent(studentEditing);
        }
    }, [studentEditing]);



    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setStudent({
            ...student,
            [name]: value,
        });
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        dispatch(updateStudent(student))
    }

    if (!openModal) return null;

    return (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/50">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                    <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                        <h3 className="text-lg font-medium text-heading">
                            Cập nhật sinh viên
                        </h3>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 flex justify-center items-center">
                            ✕
                        </button>
                    </div>
                    <div className="space-y-4 md:space-y-6 py-4 md:py-6">
                        <div className="w-full flex items-center justify-center h-1/2 rounded-base mb-4 mt-2">
                            <form onSubmit={handleUpdate}>
                                <div className="w-xl mx-auto">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="mb-5">
                                            <label className="block mb-2.5 text-sm font-medium text-heading">Mã sinh viên</label>
                                            <input type="number" disabled={true} onChange={handleOnChange} value={studentEditing.maSV} name="maSV" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                        </div>
                                        <div className="mb-5">
                                            <label className="block mb-2.5 text-sm font-medium text-heading">Họ tên</label>
                                            <input type="text" onChange={handleOnChange} value={student.hoTen} name="hoTen" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
                                            {updateError.hoTen && <div className="p-4 mt-2 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                                                <p className="font-medium me-1">{updateError.hoTen}</p>
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="mb-5">
                                            <label className="block mb-2.5 text-sm font-medium text-heading">Số điện thoại</label>
                                            <input type="number" onChange={handleOnChange} value={student.phone} name="phone" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                            {updateError.phone && <div className="p-4 mt-2 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                                                <p className="font-medium me-1">{updateError.phone}</p>
                                            </div>}
                                        </div>
                                        <div className="mb-5">
                                            <label className="block mb-2.5 text-sm font-medium text-heading">Email</label>
                                            <input type="email" onChange={handleOnChange} value={student.email} name="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
                                            {updateError.email && <div className="p-4 mt-2 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                                                <p className="font-medium me-1">{updateError.email}</p>
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                                <button className="text-white bg-brand mr-4 px-4 py-2 rounded-base hover:bg-brand-light hover:scale-105 hover:transition-all-ease-in-out duration-300">
                                    Cập nhật
                                </button>
                                <button onClick={closeModal} className="text-body bg-gray-100 px-4 py-2 rounded-base hover:bg-gray-200 hover:scale-105 hover:transition-all-ease-in-out duration-300">
                                    Hủy bỏ
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}