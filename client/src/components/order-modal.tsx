import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Имя слишком короткое"),
  email: z.string().email("Некорректный email"),
  projectType: z.enum(["plugin", "mod", "server", "consultation"]),
  budget: z.enum(["low", "medium", "high", "ultra"]),
  description: z.string().optional(),
  contact: z.string().min(3, "Укажите Discord или Telegram"),
});

export function OrderModal({ isOpen, onClose, initialValues }: { isOpen: boolean; onClose: () => void; initialValues?: any }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: "",
      email: "",
      projectType: "plugin",
      budget: "low",
      description: "",
      contact: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      form.reset();
    }, 3000);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, rotateX: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg glass-premium p-8 rounded-[32px] border border-primary/20 shadow-[0_0_50px_rgba(57,255,20,0.1)] preserve-3d"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-primary transition-colors"
            >
              <X size={24} />
            </button>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-20 text-center"
              >
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-primary w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Заявка отправлена!</h3>
                <p className="text-gray-400">Свяжемся в течение часа</p>
              </motion.div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
                    ОБСУДИТЬ <span className="text-primary">ПРОЕКТ</span>
                  </h2>
                  <p className="text-gray-400">Заполните форму, и мы создадим нечто легендарное</p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300 text-xs uppercase tracking-widest font-bold">Имя</FormLabel>
                            <FormControl>
                              <Input placeholder="Стив" className="bg-white/5 border-white/10 focus:border-primary/50 rounded-xl h-12" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400 text-[10px]" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300 text-xs uppercase tracking-widest font-bold">Email</FormLabel>
                            <FormControl>
                              <Input placeholder="steve@craft.com" className="bg-white/5 border-white/10 focus:border-primary/50 rounded-xl h-12" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400 text-[10px]" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="projectType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300 text-xs uppercase tracking-widest font-bold">Тип проекта</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-white/5 border-white/10 focus:border-primary/50 rounded-xl h-12">
                                  <SelectValue placeholder="Выберите тип" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[#0a0a0a] border-white/10 z-[250]">
                                <SelectItem value="plugin">Плагин</SelectItem>
                                <SelectItem value="mod">Мод</SelectItem>
                                <SelectItem value="server">Сервер</SelectItem>
                                <SelectItem value="consultation">Консультация</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300 text-xs uppercase tracking-widest font-bold">Бюджет</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-white/5 border-white/10 focus:border-primary/50 rounded-xl h-12">
                                  <SelectValue placeholder="Бюджет" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[#0a0a0a] border-white/10 z-[250]">
                                <SelectItem value="low">До 25к</SelectItem>
                                <SelectItem value="medium">25-50к</SelectItem>
                                <SelectItem value="high">50-100к</SelectItem>
                                <SelectItem value="ultra">100к+</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="contact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300 text-xs uppercase tracking-widest font-bold">Telegram / Discord</FormLabel>
                          <FormControl>
                            <Input placeholder="@username" className="bg-white/5 border-white/10 focus:border-primary/50 rounded-xl h-12" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-[10px]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300 text-xs uppercase tracking-widest font-bold">Описание</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Расскажите о вашей идее..." 
                              className="bg-white/5 border-white/10 focus:border-primary/50 rounded-xl min-h-[100px] resize-none" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-black hover:bg-white font-bold h-14 rounded-xl shadow-[0_10px_30px_-10px_rgba(57,255,20,0.5)] group transition-all"
                    >
                      ОТПРАВИТЬ ЗАЯВКУ <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
