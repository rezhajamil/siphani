export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-amber-400  shadow-sm focus:ring-amber-500 ' +
                className
            }
        />
    );
}
