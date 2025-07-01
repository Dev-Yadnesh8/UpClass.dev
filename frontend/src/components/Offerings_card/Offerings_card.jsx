function OfferingsCard({ icon, title, description }) {
  return (
    <div className="w-full max-w-sm bg-gradient-to-br from-purple to-blue p-[2px] rounded-3xl shadow-lg hover:scale-[1.03] transition-transform duration-300">
      {/* Inner card with dark background */}
      <div className="bg-darkBg rounded-[calc(1.5rem-2px)] p-6 h-full flex flex-col items-start gap-3 text-white">
        <div className="text-4xl text-purple mb-3">{icon}</div>
        <h4 className="text-xl font-semibold">{title}</h4>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
  );
}

export default OfferingsCard;
