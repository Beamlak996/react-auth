import { School } from "lucide-react";

export const LoginContent = () => {
  return (
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black opacity-90" />

      <div className="relative z-20 flex items-center text-2xl font-semibold mb-8">
        <School className="mr-3 h-8 w-8 text-white" />
        <span className="text-3xl font-bold">School ERP</span>
      </div>

      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-4">
          <p className="text-lg font-medium leading-relaxed">
            &ldquo;Our School ERP system provides an all-in-one solution for
            managing school operations—from student attendance to grade
            management, teacher coordination, and seamless communication across
            the institution.&rdquo;
          </p>
          <p className="text-md leading-relaxed">
            Stay organized, improve efficiency, and ensure a seamless
            educational experience for students and staff alike.
          </p>
        </blockquote>
      </div>
    </div>
  );
};
