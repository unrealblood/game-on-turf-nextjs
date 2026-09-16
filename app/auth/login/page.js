import LoginForm from "@/app/components/auth/login/LoginForm";

export default async function Login() {
    return (
        <div className="flex-1 overflow-y-auto mt-16">
            <div className="sm:w-[600px] w-[280px] mx-auto flex justify-center items-center my-8 border border-gray-200 rounded-md p-4">
                <div className="w-full">
                    <header className="flex justify-center items-center gap-4 flex-col mt-4">
                        <div className="bg-green-200 text-center p-2 rounded-full w-16">
                            <span className="bi-trophy text-2xl text-teal-500" />
                        </div>

                        <h1 className="sm:text-2xl text-xl text-center font-bold">Login to your account</h1>
                    </header>

                    {/* Login Form */}
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}