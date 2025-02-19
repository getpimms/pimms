"use client";

export default function CtaButton() {
  const triggerFocus = () => {
    const input = document.getElementById("waitlist-form-input");
    if (input) {
      input.focus();
    }
  };

  const handleClickFocus = () => {
    const waitlistSection = document.getElementById("waitlist");
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: "smooth" });
    }

    triggerFocus();
  };

  return (
    <a
      onClick={handleClickFocus}
      className="hidden md:block w-fit px-5 py-2 bg-primary text-primary-foreground font-semibold rounded-md outline outline-4 transition hover:outline-[#F0A8BF] cursor-pointer"
    >
      🚀 Rejoindre la waitlist
    </a>
  );
}
