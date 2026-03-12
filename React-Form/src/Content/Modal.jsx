import { useDispatch } from "react-redux";
import { updateField, updateStudent } from "../slice"

export default function Modal({ editStudent, listStudents, openModal, closeModal }) {
    const dispatch = useDispatch();

    if (!openModal) return null;

    const findStudent = listStudents.find(item => item.maSV === editStudent);

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        dispatch(updateField({ name, value }));
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const studentUpdate = {
            maSV: formData.get("maSV"),
            hoTen: formData.get("hoTen"),
            phone: formData.get("phone"),
            email: formData.get("email"),
        };
        dispatch(updateStudent(studentUpdate));
        closeModal();
    }
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
                                            <label htmlFor="maSV" className="block mb-2.5 text-sm font-medium text-heading">Mã sinh viên</label>
                                            <input type="number" disabled={true} onChange={handleOnChange} defaultValue={findStudent.maSV} name="maSV" id="maSV" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="hoTen" className="block mb-2.5 text-sm font-medium text-heading">Họ tên</label>
                                            <input type="text" onChange={handleOnChange} defaultValue={findStudent.hoTen} id="hoTen" name="hoTen" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="mb-5">
                                            <label htmlFor="phone" className="block mb-2.5 text-sm font-medium text-heading">Số điện thoại</label>
                                            <input type="number" onChange={handleOnChange} defaultValue={findStudent.phone} id="phone" name="phone" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Email</label>
                                            <input type="email" onChange={handleOnChange} defaultValue={findStudent.email} id="email" name="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
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