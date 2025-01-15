import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, X } from "lucide-react";

interface PasswordFormInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormInputs>();

  const onSubmit: SubmitHandler<PasswordFormInputs> = (data) => {
    console.log("Password Change Data:", data);
    setIsModalOpen(false); // Close modal after successful submission
  };

  return (
    <div>
      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-offwhite rounded-lg shadow-lg w-[800px] p-6"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-primary">Change Your Password</h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X size={20} className="text-secondary" />
                </button>
              </div>

              {/* Form Section */}
              <div className="bg-primary text-white font-semibold text-center py-2 mb-4 rounded-md">
                PASSWORD DETAILS
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-3 gap-4">
                  {/* Current Password */}
                  <div>
                    <label className="block font-medium mb-1 text-secondary">
                      Current Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.current ? "text" : "password"}
                        {...register("currentPassword", {
                          required: "Current password is required",
                        })}
                        placeholder="Current password"
                        className="w-full p-2 border rounded bg-dullwhite"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            current: !prev.current,
                          }))
                        }
                        className="absolute right-2 top-2 text-secondary"
                      >
                        {showPassword.current ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.currentPassword.message}
                      </p>
                    )}
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block font-medium mb-1 text-secondary">
                      New Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.new ? "text" : "password"}
                        {...register("newPassword", {
                          required: "New password is required",
                        })}
                        placeholder="New password"
                        className="w-full p-2 border rounded bg-dullwhite"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            new: !prev.new,
                          }))
                        }
                        className="absolute right-2 top-2 text-secondary"
                      >
                        {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block font-medium mb-1 text-secondary">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.confirm ? "text" : "password"}
                        {...register("confirmPassword", {
                          required: "Confirm password is required",
                          validate: (value, formValues) =>
                            value === formValues.newPassword ||
                            "Passwords do not match",
                        })}
                        placeholder="Confirm password"
                        className="w-full p-2 border rounded bg-dullwhite"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            confirm: !prev.confirm,
                          }))
                        }
                        className="absolute right-2 top-2 text-secondary"
                      >
                        {showPassword.confirm ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary"
                  >
                    Empty
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChangePassword;
