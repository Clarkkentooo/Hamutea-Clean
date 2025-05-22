import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChineFlatLogo from "@assets/svg/chinese-flat-logo.svg";
import Profile from "@assets/svg/profile.svg";
import { useAuth } from "@context/AuthContext";

const Account = () => {
    const { currentUser, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        birthDate: ""
    });
    const [originalData, setOriginalData] = useState({});
    const [showPhoneVerification, setShowPhoneVerification] = useState(false);
    const [showEmailVerification, setShowEmailVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationError, setVerificationError] = useState("");
    const [countdown, setCountdown] = useState(0);
    const [verificationSent, setVerificationSent] = useState(false);

    useEffect(() => {
        // Redirect if not logged in
        if (!currentUser) {
            navigate('/sign-in');
            return;
        }

        // Set user data from current user
        const data = {
            name: currentUser.name || "",
            email: currentUser.email || "",
            phone: currentUser.phone || "",
            birthDate: currentUser.birthDate || ""
        };
        setUserData(data);
        setOriginalData(data);
    }, [currentUser, navigate]);

    const handleSignOut = () => {
        logout();
        navigate('/');
    };

    const handleSave = async () => {
        try {
            // Check if phone or email has changed
            const isPhoneChanged = userData.phone !== originalData.phone && userData.phone.trim() !== "";
            const isEmailChanged = userData.email !== originalData.email && userData.email.trim() !== "";
            
            if (isPhoneChanged) {
                setShowPhoneVerification(true);
                return;
            }
            
            if (isEmailChanged) {
                setShowEmailVerification(true);
                return;
            }
            
            // If only name or birthdate changed, proceed with normal update
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:7000/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            
            if (data.success) {
                updateUser({...currentUser, ...userData});
                setIsEditing(false);
                setOriginalData(userData);
            } else {
                alert(data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Server error. Please try again later.');
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        
        // Map input IDs to state properties
        const fieldMap = {
            'full_name': 'name',
            'phone_number': 'phone',
            'birth_date': 'birthDate',
            'email': 'email'
        };
        
        const field = fieldMap[id] || id;
        
        setUserData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    
    const handleSendPhoneCode = async () => {
        setIsVerifying(true);
        setVerificationError("");
        
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:7000/api/verification/send-phone-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ phone: userData.phone })
            });
            
            const data = await response.json();
            
            if (data.success) {
                setVerificationSent(true);
                // Start countdown for resend (60 seconds)
                setCountdown(60);
                const timer = setInterval(() => {
                    setCountdown(prev => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            } else {
                setVerificationError(data.message || 'Failed to send verification code');
            }
        } catch (error) {
            console.error('Error sending verification code:', error);
            setVerificationError('Server error. Please try again later.');
        } finally {
            setIsVerifying(false);
        }
    };
    
    const handleVerifyPhone = async (e) => {
        e.preventDefault();
        
        if (!verificationCode) {
            setVerificationError("Please enter the verification code");
            return;
        }
        
        setIsVerifying(true);
        setVerificationError("");
        
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:7000/api/verification/verify-phone-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ code: verificationCode })
            });
            
            const data = await response.json();
            
            if (data.success) {
                updateUser({...currentUser, ...data.data});
                setShowPhoneVerification(false);
                setIsEditing(false);
                setVerificationCode("");
                setVerificationSent(false);
                setOriginalData(prev => ({...prev, phone: userData.phone}));
            } else {
                setVerificationError(data.message || 'Invalid verification code');
            }
        } catch (error) {
            console.error('Error verifying code:', error);
            setVerificationError('Server error. Please try again later.');
        } finally {
            setIsVerifying(false);
        }
    };
    
    const handleSendEmailVerification = async () => {
        setIsVerifying(true);
        setVerificationError("");
        
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:7000/api/verification/send-email-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email: userData.email })
            });
            
            const data = await response.json();
            
            if (data.success) {
                alert("Verification email sent. Please check your inbox and click the verification link.");
                setShowEmailVerification(false);
                setIsEditing(false);
                // We don't update the original data yet since email needs to be verified via link
            } else {
                setVerificationError(data.message || 'Failed to send verification email');
            }
        } catch (error) {
            console.error('Error sending verification email:', error);
            setVerificationError('Server error. Please try again later.');
        } finally {
            setIsVerifying(false);
        }
    };

    // Phone verification modal
    const renderPhoneVerification = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Verify Your Phone Number</h2>
                <p className="mb-4">We need to verify your phone number: <strong>{userData.phone}</strong></p>
                
                {!verificationSent ? (
                    <div>
                        <p className="mb-4">Click the button below to receive a verification code via SMS.</p>
                        <button
                            onClick={handleSendPhoneCode}
                            disabled={isVerifying}
                            className="bg-hamutea-red text-white px-4 py-2 rounded-full disabled:opacity-50"
                        >
                            {isVerifying ? "Sending..." : "Send Verification Code"}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleVerifyPhone}>
                        <div className="mb-4">
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                                Enter the 6-digit code sent to your phone
                            </label>
                            <input
                                type="text"
                                id="code"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="123456"
                                maxLength={6}
                            />
                        </div>
                        
                        {verificationError && <p className="text-red-500 mb-4">{verificationError}</p>}
                        
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                disabled={isVerifying || !verificationCode}
                                className="bg-hamutea-red text-white px-4 py-2 rounded-full disabled:opacity-50"
                            >
                                {isVerifying ? "Verifying..." : "Verify Code"}
                            </button>
                            
                            <button
                                type="button"
                                onClick={handleSendPhoneCode}
                                disabled={isVerifying || countdown > 0}
                                className="text-hamutea-red px-4 py-2 disabled:opacity-50"
                            >
                                {countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
                            </button>
                        </div>
                    </form>
                )}
                
                <div className="mt-4 text-center">
                    <button
                        onClick={() => {
                            setShowPhoneVerification(false);
                            setUserData(prev => ({...prev, phone: originalData.phone}));
                            setVerificationCode("");
                            setVerificationSent(false);
                        }}
                        className="text-gray-500 underline"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
    
    // Email verification modal
    const renderEmailVerification = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Verify Your Email Address</h2>
                <p className="mb-4">We need to verify your email address: <strong>{userData.email}</strong></p>
                <p className="mb-4">Click the button below to receive a verification link via email.</p>
                
                {verificationError && <p className="text-red-500 mb-4">{verificationError}</p>}
                
                <div className="flex justify-between">
                    <button
                        onClick={handleSendEmailVerification}
                        disabled={isVerifying}
                        className="bg-hamutea-red text-white px-4 py-2 rounded-full disabled:opacity-50"
                    >
                        {isVerifying ? "Sending..." : "Send Verification Email"}
                    </button>
                    
                    <button
                        onClick={() => {
                            setShowEmailVerification(false);
                            setUserData(prev => ({...prev, email: originalData.email}));
                        }}
                        className="text-gray-500 underline"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white h-screen overflow-hidden relative flex items-center justify-center p-10">
            <div className="absolute top-0 left-0 w-full bg-[#FFEEC3] h-[22.6875rem] overflow-hidden z-0">
                <div className="absolute top-0 right-0 z-0">
                    <img src={ChineFlatLogo} alt="" />
                </div>
            </div>

            <div className="w-full bg-white max-w-xl mt-24 z-10 rounded-2xl relative border border-hamutea-border p-10">
                <div className="absolute -top-10 transform -translate-x-1/2 left-1/2 z-0">
                    <img src={Profile} alt="" className="h-28 w-28 rounded-full" />
                </div>

                <div className="flex justify-end w-full">
                    {isEditing ? (
                        <button 
                            className="rounded-full bg-hamutea-red text-white px-5 py-2"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    ) : (
                        <button 
                            className="rounded-full bg-[#fafafa] px-5 py-2 border-2 border-hamutea-border"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Info
                        </button>
                    )}
                </div>

                <div className="flex items-center justify-center flex-col">
                    <h1 className="text-2xl font-bold">{userData.name}</h1>
                    <p>{userData.email}</p>
                    {currentUser?.emailVerified === false && (
                        <p className="text-sm text-red-500 mt-1">Email not verified</p>
                    )}
                </div>

                <div className="flex flex-col gap-5 mt-10">
                    <div className="flex border-b border-hamutea-border pb-2">
                        <label htmlFor="full_name" className="text-hamutea-gray">Full Name</label>
                        <input 
                            type="text" 
                            id="full_name" 
                            value={userData.name}
                            onChange={handleChange}
                            className="ml-5 flex-1 appearance-none border-none outline-none bg-transparent m-0 shadow-none focus:outline-none" 
                            readOnly={!isEditing}
                            disabled={!isEditing}
                        />
                    </div>
                    
                    <div className="flex border-b border-hamutea-border pb-2">
                        <label htmlFor="email" className="text-hamutea-gray">Email</label>
                        <div className="ml-5 flex-1 flex items-center">
                            <input 
                                type="email" 
                                id="email" 
                                value={userData.email}
                                onChange={handleChange}
                                className="flex-1 appearance-none border-none outline-none bg-transparent m-0 shadow-none focus:outline-none" 
                                readOnly={!isEditing}
                                disabled={!isEditing}
                            />
                            {currentUser?.emailVerified && (
                                <span className="text-green-500 text-sm ml-2">✓ Verified</span>
                            )}
                        </div>
                    </div>

                    <div className="flex border-b border-hamutea-border pb-2">
                        <label htmlFor="phone_number" className="text-hamutea-gray">Phone Number</label>
                        <div className="ml-5 flex-1 flex items-center">
                            <input 
                                type="text" 
                                id="phone_number" 
                                value={userData.phone}
                                onChange={handleChange}
                                className="flex-1 appearance-none border-none outline-none bg-transparent m-0 shadow-none focus:outline-none" 
                                readOnly={!isEditing}
                                disabled={!isEditing}
                            />
                            {currentUser?.phoneVerified && (
                                <span className="text-green-500 text-sm ml-2">✓ Verified</span>
                            )}
                        </div>
                    </div>

                    <div className="flex border-b border-hamutea-border pb-2">
                        <label htmlFor="birth_date" className="text-hamutea-gray">Birth Date</label>
                        <input 
                            type="text" 
                            id="birth_date" 
                            value={userData.birthDate}
                            onChange={handleChange}
                            className="ml-5 flex-1 appearance-none border-none outline-none bg-transparent m-0 shadow-none focus:outline-none" 
                            readOnly={!isEditing}
                            disabled={!isEditing}
                            placeholder="YYYY-MM-DD"
                        />
                    </div>
                </div>

                <div className="flex justify-center w-full mt-10">
                    <button 
                        className="rounded-full bg-[#fadcdc] px-5 py-2 border-2 border-hamutea-red text-hamutea-red"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
            
            {showPhoneVerification && renderPhoneVerification()}
            {showEmailVerification && renderEmailVerification()}
        </div>
    );
}

export default Account;