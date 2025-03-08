import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { jwtDecode } from "jwt-decode";
import doctorApi from '../utils/services/DoctorService';
import { BackgroundDoctor } from '../Models/Doctor';
import { toast } from 'react-toastify';

const MyProfileDoctor = () => {
    const [isEdit, setIsEdit] = useState(false);

    const [userData, setUserData] = useState(BackgroundDoctor);
    const [userId, setUserId] = useState();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log("Full decoded token:", decodedToken);
            setUserId(decodedToken.sub);
        } else {
            console.log("No token found in localStorage");
        }
    }, []);

    useEffect(() => {
        if (userId) {
            const getMyProfile = async () => {
                try {
                    const myProfile = await doctorApi.getMyProfile();
                    console.log(myProfile);
                    setUserData(myProfile);
                } catch (error) {
                    console.error("Error fetching profile:", error);
                }
            };
            getMyProfile();
        }
    }, [userId]);
    
    console.log(userData);

    const handleUpdateBgDoctor = async (doctor) => {
        try {
            await doctorApi.updateProfile(doctor);
            toast.success('Successfully update your profile.', {autoClose: 1500, position: 'top-center'});
            setIsEdit(false);
        } catch (error) {
            toast.warning('Unsuccessfully update your profile', {autoClose: 1500, position: 'top-center'});
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className='max-w-lg flex flex-col gap-2 text-sm'>
            <img className='w-36 rounded' src={userData.image} alt={`image of ${userData.fullName}`} />

            {isEdit
                ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" onChange={(e) => setUserData(prev => ({ ...prev, fullName: e.target.value }))} value={userData.fullName} />
                : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.fullName}</p>
            }

            <hr className='bg-zinc-400 h-[1px] border-none' />
            <div>
                <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Email:</p>
                    <p className='text-blue-500'>{userData.email}</p>
                    <p className='font-medium'>Phone:</p>
                    {isEdit
                        ? <input className='bg-gray-100 max-w-48' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                        : <p className='text-blue-400'>{userData.phone}</p>}
                    <p className='font-medium'>Address:</p>
                    {isEdit
                        ? <p>
                            <input className='bg-gray-50 min-w-full' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: prev.address.map((a, index) => index === 0 ? e.target.value : a)}))} value={userData.address[0]} />
                            <br />
                            <input className='bg-gray-50 min-w-full' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: prev.address.map((a, index) => index === 1 ? e.target.value : a)}))} value={userData.address[1]} />
                          </p>
                        : <p className='text-gray-500'>{userData.address[0]} <br /> {userData.address[1]}</p>
                    }
                </div>
            </div>
            <div>
                <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Gender:</p>
                    <p className='text-gray-400'>{userData.gender === true ? "Male" : "Female"}</p>
                    <p className='font-medium'>Birthday:</p>
                    <p className='text-gray-400'>{new Date(userData.dateOfBirth).toLocaleDateString('en-GB')}</p>
                </div>
            </div>
            <div>
                <p className='text-neutral-500 underline mt-3'>CERTIFICATED INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Education:</p>
                    <p className='text-gray-400'>{userData.education}</p>
                    <p className='font-medium'>Specialization:</p>
                    {isEdit
                        ? <input className='max-w-28 bg-gray-100 min-w-[50%]' type='text' onChange={(e) => setUserData(prev => ({ ...prev, specialization: e.target.value }))} value={userData.specialization} />
                        : <p className='text-gray-400'>{userData.specialization}</p>
                    }
                    <p className='font-medium'>Certification:</p>
                    {isEdit
                        ? <p>
                            {userData.certifications.map((certification, index) => (
                                <React.Fragment key={index}>
                                    <input
                                        className='max-w-28 bg-gray-100 min-w-[50%]' 
                                        type='text' 
                                        onChange={(e) => {
                                            const newCertifications = [...userData.certifications];
                                            newCertifications[index] = e.target.value;
                                            setUserData(prev => ({ ...prev, certifications: newCertifications}))
                                        }} 
                                        value={certification}
                                    />
                                    <br />
                                </React.Fragment>
                            ))}
                          </p>
                        : <p className='text-gray-400'>{userData.certifications[0]} <br /> {userData.certifications[1]}</p>
                    }
                    <p className='font-medium'>License Number:</p>
                    {isEdit
                        ? <input className='max-w-28 bg-gray-100' type='text' onChange={(e) => setUserData(prev => ({ ...prev, licenseNumber: e.target.value }))} value={userData.licenseNumber} />
                        : <p className='text-gray-400'>{userData.licenseNumber}</p>
                    }
                    <p className='font-medium'>Year Of Experience:</p>
                    {isEdit
                        ? <input className='max-w-28 bg-gray-100' type='text' onChange={(e) => setUserData(prev => ({ ...prev, yearsOfExperience: e.target.value }))} value={userData.yearsOfExperience} />
                        : <p className='text-gray-400'>{userData.yearsOfExperience}</p>
                    }
                    <p className='font-medium'>Status:</p>
                    {isEdit
                        ? <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev => ({ ...prev, status: e.target.value }))} value={userData.status} >
                            <option value="Activate">Activate</option>
                            <option value="Inactive">Inactive</option>
                            <option value="On Leave">On Leave</option>
                          </select>
                        : <p className='text-gray-400'>{userData.status}</p>
                    }
                </div>
            </div>
            <div className='mt-10'>
                {
                    isEdit
                        ? <button onClick={() => handleUpdateBgDoctor(userData)} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Save information</button>
                        : <button onClick={() => setIsEdit(true)} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Edit</button>
                }
            </div>
        </div>
    )
}

export default MyProfileDoctor
