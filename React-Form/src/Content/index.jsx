import { useDispatch, useSelector } from "react-redux"
import { createStudent, updateField, removeStudent, searchStudent } from "../slice"
import { useState } from "react"
import Modal from "./Modal"

export default function Content() {

    const { student, listStudents, keyword } = useSelector(state => state.reactFormReducer)
    const [openModal, setOpenModal] = useState(false);
    const [editStudent, setEditStudent] = useState(null);
    const dispatch = useDispatch();

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        dispatch(updateField({ name, value }));
    }

    const handleCreate = (event) => {
        event.preventDefault();
        dispatch(createStudent(student));
    }

    const isOpenModal = () => {
        setOpenModal(true);
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    const renderList = () => {
        const filterStudent = listStudents.filter((item) => {
            return item.hoTen.toLowerCase().includes(keyword.toLowerCase()) || item.maSV.toString().includes(keyword);
        });

        return filterStudent.map((student) => {
            return (
                <tr key={student.maSV} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
                    <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                        {student.maSV}
                    </th>
                    <td className="px-6 py-4">
                        {student.hoTen}
                    </td>
                    <td className="px-6 py-4">
                        {student.phone}
                    </td>
                    <td className="px-6 py-4">
                        {student.email}
                    </td>
                    <td className="px-6 py-4">
                        <button className="font-medium text-fg-brand hover:underline mr-4 cursor-pointer" onClick={() => { isOpenModal(true); setEditStudent(student.maSV); }}>Edit</button>
                        <button className="font-medium text-danger hover:underline cursor-pointer" onClick={() => dispatch(removeStudent({ maSV: student.maSV }))}>Delete</button>
                    </td>
                </tr >
            );
        });
    }

    return (
        <div className="p-4 sm:ml-64">
            <div className="w-full flex items-center justify-center h-1/2 rounded-base mb-4 mt-12">
                <form onSubmit={handleCreate}>
                    <div className="w-4xl mx-auto">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="mb-5">
                                <label htmlFor="maSV" className="block mb-2.5 text-sm font-medium text-heading">Mã sinh viên</label>
                                <input type="number" onChange={handleOnChange} name="maSV" id="maSV" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="hoTen" className="block mb-2.5 text-sm font-medium text-heading">Họ tên</label>
                                <input type="text" id="hoTen" onChange={handleOnChange} name="hoTen" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="mb-5">
                                <label htmlFor="phone" className="block mb-2.5 text-sm font-medium text-heading">Số điện thoại</label>
                                <input type="number" id="phone" onChange={handleOnChange} name="phone" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Email</label>
                                <input type="email" id="email" onChange={handleOnChange} name="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Thêm sinh viên</button>
                </form>
            </div>
            <div className="flex items-center justify-center h-1/2 rounded-base mb-4">
                <div className="w-4xl bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                    <div className="p-4">
                        <label htmlFor="input-group-1" className="sr-only">Tìm kiếm</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                            </div>
                            <input onChange={(e) => dispatch(searchStudent(e.target.value))} type="text" id="input-group-1" className="block w-full max-w-96 ps-9 pe-3 py-2 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 shadow-xs placeholder:text-body" placeholder="Tìm theo tên" />
                        </div>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-body">
                        <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-t border-default-medium">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Mã sinh viên
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Họ tên
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Số điện thoại
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Email
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderList()}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal editStudent={editStudent} listStudents={listStudents} closeModal={closeModal} openModal={openModal} />
        </div>
    )
}
