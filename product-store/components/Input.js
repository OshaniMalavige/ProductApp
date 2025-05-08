'use client';

export default function InputField({
                                       id,
                                       label,
                                       type = 'text',
                                       register,
                                       errors,
                                       as = 'input',
                                       rows = 3
                                   }) {
    const Tag = as === 'textarea' ? 'textarea' : 'input';

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <Tag
                id={id}
                type={type}
                rows={as === 'textarea' ? rows : undefined}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors?.[id] ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register(id)}
            />
            {errors?.[id] && (
                <p className="mt-1 text-xs text-red-500">{errors[id]?.message}</p>
            )}
        </div>
    );
}
