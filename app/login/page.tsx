import { NextPage } from "next";
import LoginForm from "@/components/LoginForm";
import { BottomNavbar } from "@/components/Navbar";

const Login: NextPage = () => {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-white w-full">
        <BottomNavbar />
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;

//   return (
//     <div>
//       <p>Not logged in</p>
//       <form>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <button type="button" onClick={() => login(email, password)}>
//           Login
//         </button>
//         <button type="button" onClick={register}>
//           Register
//         </button>
//         <button
//           className="flex justify-center items-center gap-2 border-2 border-slate-600 px-5 py-2 rounded-sm"
//           onClick={signInWithGoogle}
//         >
//           <FcGoogle size={30} />
//           <span>Login with Google</span>
//         </button>
//       </form>
//     </div>
//   );
