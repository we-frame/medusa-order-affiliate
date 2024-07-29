import { Button, Switch } from "@medusajs/ui";

export const AffiliateDetailsCard = () => {
  return (
    <>
      <div className="w-full bg-white p-6 flex items-center justify-between gap-5 rounded-lg shadow-sm">
        <div className="w-[30%] p-4 flex flex-col items-start justify-start gap-2">
          <h4 className="text-base font-semibold">Affiliate Program</h4>
          <p className="text-sm text-[#7c8088]">
            Affiliate drive sales to your product(s) and receive a percentage of
            the sale price for successful referrals. After activating affiliate
            status for this user, you can set their commission.
          </p>
        </div>

        <div className="w-[70%] bg-[#f8f8f9] p-6 flex flex-col items-start justify-start gap-8 rounded-lg">
          <div className="flex flex-col items-start justify-start gap-2">
            <h4 className="text-base font-semibold">Active</h4>
            <p className="text-sm text-[#7c8088]">
              This user will oly receive affiliate commissions while this toggle
              is turned on.
            </p>
            <Switch size="base" />
          </div>

          <div className="flex items-start justify-start gap-10">
            <div className="flex flex-col items-start justify-start gap-2">
              <p className="text-sm text-[#7c8088]">Affiliate Code</p>
              <h4 className="text-base font-semibold">245841_59zbtmae</h4>
            </div>

            <div className="flex flex-col items-start justify-start gap-2">
              <p className="text-sm text-[#7c8088]">Affiliate Link</p>
              <a
                href={`https://learn.pilotinstitute.com/?affcode=${"245841_59zbtmae"}`}
                target="_blank"
                className="text-base text-[#5ea3f7] font-semibold"
              >{`https://learn.pilotinstitute.com/?affcode=${"245841_59zbtmae"}`}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white p-6 flex items-center justify-between gap-5 rounded-lg shadow-sm">
        <div className="w-[30%] p-4 flex flex-col items-start justify-start gap-1">
          <h4 className="text-base font-semibold">Affiliate Commission</h4>
          <p className="text-sm text-[#7c8088]">
            Set what percentage of the sale price affiliates will receive for
            purchase they drive.
          </p>
        </div>

        <div className="w-[70%] bg-[#f8f8f9] px-6 py-14 flex flex-col items-start justify-start gap-2 rounded-lg">
          <div className="flex flex-col items-start justify-start gap-10">
            <div className="flex flex-col items-start justify-start gap-2">
              <h4 className="text-base font-semibold">Affiliate Commission</h4>
              <div className="flex items-center justify-start gap-5">
                <div className="relative rounded-md shadow-sm">
                  <input
                    name="percentage"
                    type="text"
                    placeholder="Enter Commission"
                    className="block w-[400px] rounded-md border-0 py-3 pr-10 pl-2 sm:text-sm sm:leading-6"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#7c8088] text-lg">
                    %
                  </div>
                </div>

                <Button variant="transparent" className="bg-[#60a5fa] hover:bg-[#60a5fa] py-3 px-5 text-base text-white">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
