import React from 'react';

const ChangeRoleButton = () => {
    const handleChangeRole = (event) => {
        event.preventDefault();
        const form = event.target;
        form.submit();
    };

    return (
        <form method="POST" action="/user/change-role?role=Seller" onSubmit={handleChangeRole}>
            <button type="submit" className="bg-amber-500 px-4 py-3 rounded-lg text-white text-base font-medium">
                Buka Toko
            </button>
        </form>
    );
};

export default ChangeRoleButton;
