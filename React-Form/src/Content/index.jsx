import { useDispatch, useSelector } from "react-redux"
import { createStudent, updateField, removeStudent } from "../slice"

export default function Content() {
    const { student, listStudents } = useSelector(state => state.reactFormReducer)
    const dispatch = useDispatch();

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        dispatch(updateField({ name, value }));

    }

    const handleCreate = (event) => {
        event.preventDefault();
        dispatch(createStudent(student));
    }

    const renderList = () => {
        return listStudents.map((student) => {
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
                        <button data-modal-target="default-modal" data-modal-toggle="default-modal" className="font-medium text-fg-brand hover:underline mr-4 cursor-pointer">Edit</button>
                        <button className="font-medium text-danger hover:underline cursor-pointer" onClick={() => dispatch(removeStudent(student.maSV))}>Delete</button>
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
                        <label htmlFor="input-group-1" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                            </div>
                            <input type="text" id="input-group-1" className="block w-full max-w-96 ps-9 pe-3 py-2 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Search" />
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
            <div id="default-modal" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                        {/* Modal header */}
                        <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                            <h3 className="text-lg font-medium text-heading">
                                Terms of Service
                            </h3>
                            <button type="button" className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 17.94 6M18 18 6.06 6" /></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="space-y-4 md:space-y-6 py-4 md:py-6">
                            <p className="leading-relaxed text-body">
                                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                            </p>
                            <p className="leading-relaxed text-body">
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                            </p>
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center border-t border-default space-x-4 pt-4 md:pt-5">
                            <button data-modal-hide="default-modal" type="button" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">I accept</button>
                            <button data-modal-hide="default-modal" type="button" className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Decline</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
