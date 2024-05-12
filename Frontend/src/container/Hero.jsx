import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Hero = () => {
  const ref = useRef();
  let passref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const showPassword = () => {
    if (ref.current.src.includes("/icons/eyecross.png")) {
      ref.current.src = "/icons/eye.png";
    } else {
      ref.current.src = "/icons/eyecross.png";
    }
    if (passref.current.type.includes("password")) {
      passref.current.type = "text";
    } else {
      passref.current.type = "password";
    }
  };

  const getPassword = async () =>{
    let req = await fetch('http://localhost:3000/')
    let passwords = await req.json()
    setPasswordArray(passwords);
    console.log(passwords)
  }

  useEffect(() => {
    getPassword()
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const savePassword = async () => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){
    setPasswordArray([...passwordArray, {...form,id: uuidv4()}]);
    let res = await fetch('http://localhost:3000/',{ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form,id: uuidv4() }) })
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id: uuidv4()}]));
    // console.log([...passwordArray, {...form,id: uuidv4()}]);
    setForm({ site: "", username: "", password: "" })
    toast('Your password saved successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    }
    else {
      toast('Your password not saved', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  };

  const editPassword = async (id) => {
    console.log("edit password")
    setForm(passwordArray.filter(e=>e.id===id)[0])
    setPasswordArray(passwordArray.filter(e=>e.id!==id))
    let res = await fetch('http://localhost:3000/',{ method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
  }

  const deletePassword = async (id) => {
    let c = confirm("Do you really want to delete this password?")
    if (c){
      setPasswordArray(passwordArray.filter(e=>e.id!==id))
      let res = await fetch('http://localhost:3000/',{ method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
      toast('Your password deleted successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
<ToastContainer />
      <div className="p-2 md:p-0 bg-slate-50 md:px-40 md:py-16 md:container md:mx-auto text-center">
        <h1 className="font-bold text-2xl">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <h3>Your Password Manager</h3>

        <div className="gap-7 text-black p-4 flex flex-col m-4 items-center">
          <input
            onChange={handleChange}
            name="site"
            value={form.site}
            placeholder="Enter Website Url"
            className="rounded-full border border-green-700 p-4 py-1 w-full"
            type="text"
          />
          <div className="gap-7 flex md:flex-row flex-col justify-between w-full">
            <input
              onChange={handleChange}
              name="username"
              value={form.username}
              placeholder="Enter Username"
              className="rounded-full border border-green-700 p-4 py-1 w-full"
              type="text"
            />
            <div className="relative">
              <input
                ref={passref}
                onChange={handleChange}
                name="password"
                value={form.password}
                placeholder="Enter Password"
                className="rounded-full border border-green-700 p-4 py-1 w-full"
                type="password"
              />
              <span
                className="absolute right-1.5 top-1.5 cursor-pointer"
                onClick={showPassword}
              >
                <img ref={ref} width={24} src="icons/eye.png" alt="" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="border-2 border-slate-600 rounded-full p-1 w-fit bg-green-400 px-3"
          >
            Save Password
          </button>
        </div>
        
        <div className="passwords mb-10">
        <h1 className="w-fit font-bold text-xl">Your Passwords</h1>
        {passwordArray.length === 0 && <div className="w-fit font-semibold text-lg">No passwords to show</div>}
        {passwordArray.length != 0 && 
          <table className="table-fixed w-full">
            <thead className="bg-green-500 border border-white p-2">
              <tr>
                <th className="py-2 border border-white">Website</th>
                <th className="py-2 border border-white">Username</th>
                <th className="py-2 border border-white">Password</th>
                <th className="py-2 border border-white">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-100">
              {passwordArray.map((item,index) => {
                return <tr key={index}>
                  <td className="py-2 border border-white">
                    <div className=" flex justify-center items-center">
                      <a href={item.site} target="_blank">{item.site}</a>
                      <div onClick={()=>copyText(item.site)}><img className="w-7 cursor-pointer px-1" src="icons/copy.png" alt="copy" /></div>
                    </div>
                  </td>
                  <td className="py-2 border border-white">
                    <div className=" flex justify-center items-center">
                      <div>{item.username}</div>
                      <div onClick={()=>copyText(item.username)}><img className="w-7 cursor-pointer px-1" src="icons/copy.png" alt="copy" /></div>
                    </div>
                  </td>
                  <td className="py-2 border border-white">
                  <div className=" flex justify-center items-center">
                      <div>{item.password}</div>
                      <div onClick={()=>copyText(item.password)}><img className="w-7 cursor-pointer px-1" src="icons/copy.png" alt="copy" /></div>
                    </div>
                  </td>
                  <td className="py-2 border border-white flex justify-center">
                    <div className=" flex justify-center items-center">
                      <img onClick={()=>editPassword(item.id)} className="w-7 cursor-pointer px-1" src="icons/pencil.png" alt="edit" />
                      <img onClick={()=>deletePassword(item.id)} className="w-7 cursor-pointer px-1" src="icons/bin.png" alt="delete" />
                    </div>
                  </td>
                </tr>;
              })}
            </tbody>
          </table>
        }
        </div>
      </div>
    </>
  );
};

export default Hero;
