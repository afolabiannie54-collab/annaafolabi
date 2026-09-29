import StartForm from "@/components/StartForm";

export const metadata = {
  title: "Start a Project | Anna Afolabi",
  description: "Tell me what you're working on, and let's build it.",
};

export default function StartPage() {
  return (
    <section className="relative bg-background min-h-[85vh] px-6 md:px-12 pt-28 md:pt-36 pb-28 flex flex-col items-center">
      <div className="w-full max-w-xl">
        <StartForm />
      </div>
    </section>
  );
}
