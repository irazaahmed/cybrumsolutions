/**
 * Renders the company phone number in its locked mnemonic format
 * "0337-0(292786) CYBRUM", highlighting "292786" and "CYBRUM" so viewers
 * notice the last six digits spell the company name. Digits and spacing
 * are fixed; only the accent styling is applied. Source: contact.phoneDisplay.
 */
export function PhoneDisplay({ className }: { className?: string }) {
  return (
    <span className={className}>
      0337-0(
      <span className="font-semibold text-accent-bright">292786</span>){" "}
      <span className="font-semibold text-accent-bright">CYBRUM</span>
    </span>
  );
}
