import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { PencilIcon, CheckIcon } from 'lucide-react';

export type FieldConfig = {
    label: string;
    name: string;
    type: 'text' | 'email' | 'number' | 'date' | 'select' | 'file';
    options?: string[];
};

interface SettingsFormProps {
    title: string;
    fields: FieldConfig[];
    defaultValues: Record<string, any>;
    onSubmit: (data: Record<string, any>) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ title, fields, defaultValues, onSubmit }) => {
    const { control, handleSubmit, reset, formState: { isDirty, isSubmitSuccessful } } = useForm({
        defaultValues
    });

    const [editable, setEditable] = React.useState(false);

    React.useEffect(() => {
        if ((!editable && isDirty) || isSubmitSuccessful) {
            reset();
        }
    }, [editable, isDirty, isSubmitSuccessful, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">{title}</h1>
                <button
                    type="button"
                    onClick={() => setEditable(!editable)}
                    className="p-2 rounded-md bg-gray-200 hover:bg-gray-300">
                    {editable ? <CheckIcon className="h-5 w-5 text-green-500" /> : <PencilIcon className="h-5 w-5" />}
                </button>
            </div>
            {fields.map(field => (
                <div key={field.name} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                    <Controller
                        name={field.name}
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            field.type === 'select' ?
                                <select onChange={onChange} onBlur={onBlur} value={value} disabled={!editable} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                    {field.options?.map(option => <option key={option} value={option}>{option}</option>)}
                                </select>
                                :
                                <input
                                    type={field.type}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    disabled={!editable}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                        )}
                    />
                </div>
            ))}
            {editable && (
                <button type="submit" className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Save Changes
                </button>
            )}
        </form>
    );
};

export default SettingsForm;
