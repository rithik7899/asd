"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import RankCard from "./ranking/page"

const formSchema = z.object({
  answerKeyUrl: z.string().url().optional(),
  horizontalCat: z.string().optional(),
  category: z.string(),
  language: z.string(),
  zone: z.string(),
  password: z.string().optional(),
})

export default function ExamRank() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answerKeyUrl: "",
      horizontalCat: "",
      category: "",
      language: "",
      zone: "",
      password: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const data = await axios.post('/api/scrape', {
        answerKeyUrl: values.answerKeyUrl,
        zone: values.zone,
        category: values.category,
        password: values.password,
        horizontalCat: values.horizontalCat,
        language: values.language
      });
      console.log(data);
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8 ">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Check Your Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="answerKeyUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Answer Key URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">UR</SelectItem>
                            <SelectItem value="obc">OBC</SelectItem>
                            <SelectItem value="ews">EWS</SelectItem>
                            <SelectItem value="sc">SC</SelectItem>
                            <SelectItem value="st">ST</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="horizontalCat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horizontal Cat.</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="EX SM">EX SM</SelectItem>
                            <SelectItem value="OH">OH</SelectItem>
                            <SelectItem value="VH">VH</SelectItem>
                            <SelectItem value="HH">HH</SelectItem>
                            <SelectItem value="OTHER PWD">OTHER PWD</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Paper Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="hindi">Hindi</SelectItem>
                            <SelectItem value="bengali">Bengali</SelectItem>
                            <SelectItem value="assamese">Assamese</SelectItem>
                            <SelectItem value="gujarati">Gujarati</SelectItem>
                            <SelectItem value="kannada">Kannada</SelectItem>
                            <SelectItem value="tamil">Tamil</SelectItem>
                            <SelectItem value="konkani">Konkani</SelectItem>
                            <SelectItem value="malayalam">Malayalam</SelectItem>
                            <SelectItem value="manipuri">Manipuri</SelectItem>
                            <SelectItem value="marathi">Marathi</SelectItem>
                            <SelectItem value="odiya">Odiya</SelectItem>
                            <SelectItem value="punjabi">Punjabi</SelectItem>
                            <SelectItem value="telugu">Telugu</SelectItem>
                            <SelectItem value="urdu">Urdu</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password(optional)</FormLabel>
                        <FormControl>
                          <Input type="password" {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RRB Zone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select zone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                            <SelectItem value="ajmer">Ajmer</SelectItem>
                            <SelectItem value="bangalore">Bangalore</SelectItem>
                            <SelectItem value="bhopal">Bhopal</SelectItem>
                            <SelectItem value="bhubaneswar">Bhubaneswar</SelectItem>
                            <SelectItem value="bilaspur">Bilaspur</SelectItem>
                            <SelectItem value="chandigarh">Chandigarh</SelectItem>
                            <SelectItem value="chennai">Chennai</SelectItem>
                            <SelectItem value="gorakhpur">Gorakhpur</SelectItem>
                            <SelectItem value="guwahati">Guwahati</SelectItem>
                            <SelectItem value="jammu-srinagar">Jammu-Srinagar</SelectItem>
                            <SelectItem value="kolkata">Kolkata</SelectItem>
                            <SelectItem value="malda">Malda</SelectItem>
                            <SelectItem value="mumbai">Mumbai</SelectItem>
                            <SelectItem value="muzaffarpur">Muzaffarpur</SelectItem>
                            <SelectItem value="siliguri">Siliguri</SelectItem>
                            <SelectItem value="patna">Patna</SelectItem>
                            <SelectItem value="prayagraj">Prayagraj</SelectItem>
                            <SelectItem value="ranchi">Ranchi</SelectItem>
                            <SelectItem value="secundarabad">Secundarabad</SelectItem>
                            <SelectItem value="thiruvananthapuram">Thiruvananthapuram</SelectItem>
                          </SelectContent>

                        </Select>
                        <FormMessage />
                      </FormItem>
                      
                    )}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <RankCard/>
        {/* <pre>{JSON.stringify(data)}</pre> */}
      </div>
    </div>
  )
}

