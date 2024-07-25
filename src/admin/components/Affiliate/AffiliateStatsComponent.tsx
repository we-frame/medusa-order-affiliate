interface AffiliateStatsComponentTypes {
  title: string;
  amount: string;
  icon: JSX.Element;
}

export const AffiliateStatsComponent = ({
  title,
  amount,
  icon,
}: AffiliateStatsComponentTypes) => {
  return (
    <div className="bg-white flex flex-col items-start justify-start gap-2 p-4 border rounded-lg shadow-sm">
      <h3 className="text-2xl font-semibold">{amount}</h3>

      <div className="flex items-center gap-1">
        {icon}
        <p className="text-base font-medium">{title}</p>
      </div>
    </div>
  );
};
