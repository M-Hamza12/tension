const AccountCreated = () => {
  return (
    <div
      className="fadeInDown absolute z-50 p-4 rounded-2xl text-slate-50 w-5/6"
      style={{ backgroundColor: '#8bc34a' }}
    >
      <h1 className="text-center font-lg">Account has created Successfully!</h1>
      <p className="text-center">
        Please <span className="text-orange-500">Signin</span>
      </p>
    </div>
  );
};

export default AccountCreated;
