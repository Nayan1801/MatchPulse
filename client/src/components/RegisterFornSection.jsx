import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BentoTilt } from "./Features";
import AnimatedTitle from "./AnimatedTitle";

export default function RegisterFormSection() {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    studentName: "",
    guardianName: "",
    mobile: "",
    email: "",
    classGrade: "",
    schoolName: "",
    course: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      formRef.current,
      {
        y: 100,
        opacity: 0,
        scale: 0.9,
        rotateX: 45,
        transformPerspective: 800,
      },
      {
        duration: 1.5,
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        ease: "power4.out",
      }
    );

    // Floating animation
    const floatAnim = gsap.to(formRef.current, {
      y: "+=10",
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut",
    });

    // Store animation reference for control
    formRef.current._floatAnim = floatAnim;

    return () => {
      floatAnim.kill();
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.studentName) newErrors.studentName = "Required";
    if (!formData.guardianName) newErrors.guardianName = "Required";
    if (!/^[0-9]{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter valid 10-digit number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.classGrade) newErrors.classGrade = "Required";
    if (!formData.schoolName) newErrors.schoolName = "Required";
    if (!formData.course) newErrors.course = "Select a course";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center px-4  pb-25 pt-0 mb-0">
      <BentoTilt className="pt-10 pb-25 size-full object-center object-cover">
        <div
          ref={formRef}
          className="bg-[#111827] p-8 rounded-2xl shadow-2xl w-full max-w-md text-white border border-gray-700"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400 drop-shadow-lg inline-block">
            Register Now
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {[
              ["studentName", "Student's Full Name"],
              ["guardianName", "Parent/Guardian's Name"],
              ["mobile", "Mobile Number"],
              ["email", "Email Address"],
              ["classGrade", "Class / Grade (Standard)"],
              ["schoolName", "School Name"],
            ].map(([field, label]) => (
              <div key={field}>
                <label className="block mb-1 text-sm text-gray-300">{label}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md bg-gray-800 text-white border ${
                    errors[field]
                      ? "border-red-500"
                      : "border-gray-600 focus:ring-cyan-400"
                  } focus:outline-none focus:ring-2`}
                />
                {errors[field] && (
                  <p className="text-red-400 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            {/* Dropdown */}
            <div>
              <label className="block mb-1 text-sm text-gray-300">
                Interested Course
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                onFocus={() => formRef.current?._floatAnim?.pause()}
                onBlur={() => formRef.current?._floatAnim?.resume()}
                className={`w-full px-4 py-2 rounded-md bg-gray-800 text-white border ${
                  errors.course ? "border-red-500" : "border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-cyan-400`}
              >
                <option value="">Select a course</option>
                <option value="jee">JEE Foundation</option>
                <option value="neet">NEET Foundation</option>
                <option value="maths">Maths Booster</option>
                <option value="coding">Coding & Logic</option>
                <option value="science">Science Olympiad</option>
              </select>
              {errors.course && (
                <p className="text-red-400 text-sm mt-1">{errors.course}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-2 bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300 text-white rounded-md font-semibold shadow-lg hover:shadow-cyan-500/30"
            >
              Submit Registration
            </button>
          </form>
        </div>
      </BentoTilt>
    </section>
  );
}
