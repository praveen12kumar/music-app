import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GradientWrapper from "../../../components/molecules/gradientWrapper/GradientWrapper";
import { verifyEmail } from "../../../redux/slices/auth-slice";
import toast from "react-hot-toast";

function EmailVerification() {
	// State for storing the 6-digit code
	const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
	const inputRefs = useRef<HTMLInputElement[]>([]); // Ref for input fields
	const navigate = useNavigate();

	// Handles input changes (including pasting)
	const handleChange = (index: number, value: string) => {
		const newCode = [...code];

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findIndex((digit) => digit === "");
			const focusIndex = lastFilledIndex === -1 ? 5 : lastFilledIndex;
			inputRefs.current[focusIndex]?.focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1]?.focus();
			}
		}
	};

	// Handles backspace navigation between inputs
	const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	// Handles form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const verificationCode = code.join("");

		try {
			await verifyEmail(verificationCode); // Replace with your actual function
			toast.success("Email verified successfully");
			navigate("/");
		} catch (error) {
			toast.error("something went wrong");
			console.error(error);
		}
	};

	// Auto-submit when all fields are filled
	useEffect(() => {
		if (code.every((digit) => digit !== "") && code.join("").length === 6) {
			handleSubmit(new Event("submit") as unknown as React.FormEvent);
		}
	}, [code]);

	return (
		<GradientWrapper graditientStyles="custom-gradient-black">
			<div className="w-full h-dvh flex items-center justify-center">
				<div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
					<div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md">
						<h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
							Verify Your Email
						</h2>
						<p className="text-center text-gray-300 mb-6">
							Enter the 6-digit code sent to your email address.
						</p>

						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="flex justify-between">
								{code.map((digit, index) => (
									<input
										key={index}
										ref={(el) => (inputRefs.current[index] = el!)}
										type="text"
										maxLength={1}
										value={digit}
										onChange={(e) => handleChange(index, e.target.value)}
										onKeyDown={(e) => handleKeyDown(index, e)}
										className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
									/>
								))}
							</div>

							<button
								type="submit"
								className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:scale-105 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
								disabled={code.some((digit) => digit === "")}
							>
								Verify Email
							</button>
						</form>
					</div>
				</div>
			</div>
		</GradientWrapper>
	);
}

export default EmailVerification;
