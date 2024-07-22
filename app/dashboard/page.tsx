"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Home,
  MessageSquare,
  Users2,
  Settings,
  PanelLeft,
  Package2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { columns } from "@/components/dashboard/home/columns";
import { DataTable } from "@/components/dashboard/home/data-table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const email = localStorage.getItem("email")?.toString() || "";
    if (email?.length > 0) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
     router.push("/sign-in");
    }
  }, []);

  const Logout = () => {
    localStorage.removeItem("email");
    router.push("/sign-in");
  }


  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="/"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Voice AI</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/chat"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span className="sr-only">Chat</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Chat</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/users"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Users</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Users</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Voice AI</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="/chat"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <MessageSquare className="h-5 w-5" />
                    Chat
                  </Link>
                  <Link
                    href="/dashboard/users"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Users2 className="h-5 w-5" />
                    Users
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Image
                    src="/placeholder-user.png"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                onClick={Logout}
                >Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {/* <Card>
              <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-4xl">$1,329</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +25% from last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card> */}
            <div className="md:hidden">
              <Image
                src="/examples/tasks-light.png"
                width={1280}
                height={998}
                alt="Playground"
                className="block dark:hidden"
              />
              <Image
                src="/examples/tasks-dark.png"
                width={1280}
                height={998}
                alt="Playground"
                className="hidden dark:block"
              />
            </div>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    Welcome back!
                  </h2>
                  <p className="text-muted-foreground">
                    Here&apos;s a list of your tasks for this month!
                  </p>
                </div>
              
              </div>
              <DataTable data={tasks} columns={columns} />
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

interface Task {
  id: string;
  title: string;
  label: string;
  status: string;
  priority: string;
}

const tasks: Task[] = [
  {
    id: "TASK-8782",
    title:
      "You can't compress the program without quantifying the open-source SSD pixel!",
    status: "in progress",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-7878",
    title:
      "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    status: "backlog",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-7839",
    title: "We need to bypass the neural TCP card!",
    status: "todo",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-5562",
    title:
      "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
    status: "backlog",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-8686",
    title:
      "I'll parse the wireless SSL protocol, that should driver the API panel!",
    status: "canceled",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-1280",
    title:
      "Use the digital TLS panel, then you can transmit the haptic system!",
    status: "done",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-7262",
    title:
      "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
    status: "done",
    label: "feature",
    priority: "high",
  },
  {
    id: "TASK-1138",
    title:
      "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
    status: "in progress",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-7184",
    title: "We need to program the back-end THX pixel!",
    status: "todo",
    label: "feature",
    priority: "low",
  },
  {
    id: "TASK-5160",
    title:
      "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
    status: "in progress",
    label: "documentation",
    priority: "high",
  },
  {
    id: "TASK-5618",
    title:
      "Generating the driver won't do anything, we need to index the online SSL application!",
    status: "done",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-6699",
    title:
      "I'll transmit the wireless JBOD capacitor, that should hard drive the SSD feed!",
    status: "backlog",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-2858",
    title: "We need to override the online UDP bus!",
    status: "backlog",
    label: "bug",
    priority: "medium",
  },
  {
    id: "TASK-9864",
    title:
      "I'll reboot the 1080p FTP panel, that should matrix the HEX hard drive!",
    status: "done",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-8404",
    title: "We need to generate the virtual HEX alarm!",
    status: "in progress",
    label: "bug",
    priority: "low",
  },
  {
    id: "TASK-5365",
    title:
      "Backing up the pixel won't do anything, we need to transmit the primary IB array!",
    status: "in progress",
    label: "documentation",
    priority: "low",
  },
  {
    id: "TASK-1780",
    title:
      "The CSS feed is down, index the bluetooth transmitter so we can compress the CLI protocol!",
    status: "todo",
    label: "documentation",
    priority: "high",
  },
  {
    id: "TASK-6938",
    title:
      "Use the redundant SCSI application, then you can hack the optical alarm!",
    status: "todo",
    label: "documentation",
    priority: "high",
  },
  {
    id: "TASK-9885",
    title: "We need to compress the auxiliary VGA driver!",
    status: "backlog",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-3216",
    title:
      "Transmitting the transmitter won't do anything, we need to compress the virtual HDD sensor!",
    status: "backlog",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-9285",
    title:
      "The IP monitor is down, copy the haptic alarm so we can generate the HTTP transmitter!",
    status: "todo",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-1024",
    title:
      "Overriding the microchip won't do anything, we need to transmit the digital OCR transmitter!",
    status: "in progress",
    label: "documentation",
    priority: "low",
  },
  {
    id: "TASK-7068",
    title:
      "You can't generate the capacitor without indexing the wireless HEX pixel!",
    status: "canceled",
    label: "bug",
    priority: "low",
  },
  {
    id: "TASK-6502",
    title:
      "Navigating the microchip won't do anything, we need to bypass the back-end SQL bus!",
    status: "todo",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-5326",
    title: "We need to hack the redundant UTF8 transmitter!",
    status: "todo",
    label: "bug",
    priority: "low",
  },
  {
    id: "TASK-6274",
    title:
      "Use the virtual PCI circuit, then you can parse the bluetooth alarm!",
    status: "canceled",
    label: "documentation",
    priority: "low",
  },
  {
    id: "TASK-1571",
    title:
      "I'll input the neural DRAM circuit, that should protocol the SMTP interface!",
    status: "in progress",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-9518",
    title:
      "Compressing the interface won't do anything, we need to compress the online SDD matrix!",
    status: "canceled",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-5581",
    title:
      "I'll synthesize the digital COM pixel, that should transmitter the UTF8 protocol!",
    status: "backlog",
    label: "documentation",
    priority: "high",
  },
  {
    id: "TASK-2197",
    title:
      "Parsing the feed won't do anything, we need to copy the bluetooth DRAM bus!",
    status: "todo",
    label: "documentation",
    priority: "low",
  },
  {
    id: "TASK-8484",
    title: "We need to parse the solid state UDP firewall!",
    status: "in progress",
    label: "bug",
    priority: "low",
  },
  {
    id: "TASK-9892",
    title:
      "If we back up the application, we can get to the UDP application through the multi-byte THX capacitor!",
    status: "done",
    label: "documentation",
    priority: "high",
  },
  {
    id: "TASK-9616",
    title: "We need to synthesize the cross-platform ASCII pixel!",
    status: "in progress",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-9744",
    title:
      "Use the back-end IP card, then you can input the solid state hard drive!",
    status: "done",
    label: "documentation",
    priority: "low",
  },
  {
    id: "TASK-1376",
    title:
      "Generating the alarm won't do anything, we need to generate the mobile IP capacitor!",
    status: "backlog",
    label: "documentation",
    priority: "low",
  },
  {
    id: "TASK-7382",
    title:
      "If we back up the firewall, we can get to the RAM alarm through the primary UTF8 pixel!",
    status: "todo",
    label: "feature",
    priority: "low",
  },
  {
    id: "TASK-2290",
    title:
      "I'll compress the virtual JSON panel, that should application the UTF8 bus!",
    status: "canceled",
    label: "documentation",
    priority: "high",
  },
  {
    id: "TASK-1533",
    title:
      "You can't input the firewall without overriding the wireless TCP firewall!",
    status: "done",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-4920",
    title:
      "Bypassing the hard drive won't do anything, we need to input the bluetooth JSON program!",
    status: "in progress",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-5168",
    title:
      "If we synthesize the bus, we can get to the IP panel through the virtual TLS array!",
    status: "in progress",
    label: "feature",
    priority: "low",
  },
  {
    id: "TASK-7103",
    title: "We need to parse the multi-byte EXE bandwidth!",
    status: "canceled",
    label: "feature",
    priority: "low",
  },
  {
    id: "TASK-4314",
    title:
      "If we compress the program, we can get to the XML alarm through the multi-byte COM matrix!",
    status: "in progress",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-3415",
    title:
      "Use the cross-platform XML application, then you can quantify the solid state feed!",
    status: "todo",
    label: "feature",
    priority: "high",
  },
  {
    id: "TASK-8339",
    title:
      "Try to calculate the DNS interface, maybe it will input the bluetooth capacitor!",
    status: "in progress",
    label: "feature",
    priority: "low",
  },
  {
    id: "TASK-6995",
    title:
      "Try to hack the XSS bandwidth, maybe it will override the bluetooth matrix!",
    status: "todo",
    label: "feature",
    priority: "high",
  },
  {
    id: "TASK-8053",
    title:
      "If we connect the program, we can get to the UTF8 matrix through the digital UDP protocol!",
    status: "todo",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-4336",
    title:
      "If we synthesize the microchip, we can get to the SAS sensor through the optical UDP program!",
    status: "todo",
    label: "documentation",
    priority: "low",
  },
  {
    id: "TASK-8790",
    title:
      "I'll back up the optical COM alarm, that should alarm the RSS capacitor!",
    status: "done",
    label: "bug",
    priority: "medium",
  },
  {
    id: "TASK-8980",
    title:
      "Try to navigate the SQL transmitter, maybe it will back up the virtual firewall!",
    status: "canceled",
    label: "bug",
    priority: "low",
  },
  {
    id: "TASK-7342",
    title: "Use the neural CLI card, then you can parse the online port!",
    status: "backlog",
    label: "documentation",
    priority: "low",
  },
  {
    id: "TASK-5608",
    title:
      "I'll hack the haptic SSL program, that should bus the UDP transmitter!",
    status: "canceled",
    label: "documentation",
    priority: "low",
  },
  {
    id: "TASK-1606",
    title:
      "I'll generate the bluetooth PNG firewall, that should pixel the SSL driver!",
    status: "done",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-7872",
    title:
      "Transmitting the circuit won't do anything, we need to reboot the 1080p RSS monitor!",
    status: "canceled",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-4167",
    title:
      "Use the cross-platform SMS circuit, then you can synthesize the optical feed!",
    status: "canceled",
    label: "bug",
    priority: "medium",
  },
  {
    id: "TASK-9581",
    title:
      "You can't index the port without hacking the cross-platform XSS monitor!",
    status: "backlog",
    label: "documentation",
    priority: "low",
  },
  {
    id: "TASK-8806",
    title: "We need to bypass the back-end SSL panel!",
    status: "done",
    label: "bug",
    priority: "medium",
  },
  {
    id: "TASK-6542",
    title:
      "Try to quantify the RSS firewall, maybe it will quantify the open-source system!",
    status: "done",
    label: "feature",
    priority: "low",
  },
  {
    id: "TASK-6806",
    title:
      "The VGA protocol is down, reboot the back-end matrix so we can parse the CSS panel!",
    status: "canceled",
    label: "documentation",
    priority: "low",
  },
  {
    id: "TASK-9549",
    title: "You can't bypass the bus without connecting the neural JBOD bus!",
    status: "todo",
    label: "feature",
    priority: "high",
  },
  {
    id: "TASK-1075",
    title:
      "Backing up the driver won't do anything, we need to parse the redundant RAM pixel!",
    status: "done",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-1427",
    title:
      "Use the auxiliary PCI circuit, then you can calculate the cross-platform interface!",
    status: "done",
    label: "documentation",
    priority: "high",
  },
  {
    id: "TASK-1907",
    title:
      "Hacking the circuit won't do anything, we need to back up the online DRAM system!",
    status: "todo",
    label: "documentation",
    priority: "high",
  },
  {
    id: "TASK-4309",
    title:
      "If we generate the system, we can get to the TCP sensor through the optical GB pixel!",
    status: "backlog",
    label: "bug",
    priority: "medium",
  },
  {
    id: "TASK-3973",
    title:
      "I'll parse the back-end ADP array, that should bandwidth the RSS bandwidth!",
    status: "todo",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-7962",
    title:
      "Use the wireless RAM program, then you can hack the cross-platform feed!",
    status: "canceled",
    label: "bug",
    priority: "low",
  },
  {
    id: "TASK-3360",
    title:
      "You can't quantify the program without synthesizing the neural OCR interface!",
    status: "done",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-9887",
    title:
      "Use the auxiliary ASCII sensor, then you can connect the solid state port!",
    status: "backlog",
    label: "bug",
    priority: "medium",
  },
  {
    id: "TASK-3649",
    title:
      "I'll input the virtual USB system, that should circuit the DNS monitor!",
    status: "in progress",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-3586",
    title:
      "If we quantify the circuit, we can get to the CLI feed through the mobile SMS hard drive!",
    status: "in progress",
    label: "bug",
    priority: "low",
  },
  {
    id: "TASK-5150",
    title:
      "I'll hack the wireless XSS port, that should transmitter the IP interface!",
    status: "canceled",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-3652",
    title:
      "The SQL interface is down, override the optical bus so we can program the ASCII interface!",
    status: "backlog",
    label: "feature",
    priority: "low",
  },
  {
    id: "TASK-6884",
    title:
      "Use the digital PCI circuit, then you can synthesize the multi-byte microchip!",
    status: "canceled",
    label: "feature",
    priority: "high",
  },
  {
    id: "TASK-1591",
    title: "We need to connect the mobile XSS driver!",
    status: "in progress",
    label: "feature",
    priority: "high",
  },
  {
    id: "TASK-3802",
    title:
      "Try to override the ASCII protocol, maybe it will parse the virtual matrix!",
    status: "in progress",
    label: "feature",
    priority: "low",
  },
  {
    id: "TASK-7253",
    title:
      "Programming the capacitor won't do anything, we need to bypass the neural IB hard drive!",
    status: "backlog",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-9739",
    title: "We need to hack the multi-byte HDD bus!",
    status: "done",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-4424",
    title:
      "Try to hack the HEX alarm, maybe it will connect the optical pixel!",
    status: "in progress",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-3922",
    title:
      "You can't back up the capacitor without generating the wireless PCI program!",
    status: "backlog",
    label: "bug",
    priority: "low",
  },
  {
    id: "TASK-4921",
    title:
      "I'll index the open-source IP feed, that should system the GB application!",
    status: "canceled",
    label: "bug",
    priority: "low",
  },
  {
    id: "TASK-5814",
    title: "We need to calculate the 1080p AGP feed!",
    status: "backlog",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-2645",
    title:
      "Synthesizing the system won't do anything, we need to navigate the multi-byte HDD firewall!",
    status: "todo",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-4535",
    title:
      "Try to copy the JSON circuit, maybe it will connect the wireless feed!",
    status: "in progress",
    label: "feature",
    priority: "low",
  },
  {
    id: "TASK-4463",
    title: "We need to copy the solid state AGP monitor!",
    status: "done",
    label: "documentation",
    priority: "low",
  },
  {
    id: "TASK-9745",
    title:
      "If we connect the protocol, we can get to the GB system through the bluetooth PCI microchip!",
    status: "canceled",
    label: "feature",
    priority: "high",
  },
  {
    id: "TASK-2080",
    title:
      "If we input the bus, we can get to the RAM matrix through the auxiliary RAM card!",
    status: "todo",
    label: "bug",
    priority: "medium",
  },
  {
    id: "TASK-3838",
    title:
      "I'll bypass the online TCP application, that should panel the AGP system!",
    status: "backlog",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-1340",
    title: "We need to navigate the virtual PNG circuit!",
    status: "todo",
    label: "bug",
    priority: "medium",
  },
  {
    id: "TASK-6665",
    title:
      "If we parse the monitor, we can get to the SSD hard drive through the cross-platform AGP alarm!",
    status: "canceled",
    label: "feature",
    priority: "low",
  },
  {
    id: "TASK-7585",
    title:
      "If we calculate the hard drive, we can get to the SSL program through the multi-byte CSS microchip!",
    status: "backlog",
    label: "feature",
    priority: "low",
  },
  {
    id: "TASK-6319",
    title: "We need to copy the multi-byte SCSI program!",
    status: "backlog",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-4369",
    title: "Try to input the SCSI bus, maybe it will generate the 1080p pixel!",
    status: "backlog",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-9035",
    title: "We need to override the solid state PNG array!",
    status: "canceled",
    label: "documentation",
    priority: "low",
  },
  {
    id: "TASK-3970",
    title:
      "You can't index the transmitter without quantifying the haptic ASCII card!",
    status: "todo",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-4473",
    title:
      "You can't bypass the protocol without overriding the neural RSS program!",
    status: "todo",
    label: "documentation",
    priority: "low",
  },
  {
    id: "TASK-4136",
    title:
      "You can't hack the hard drive without hacking the primary JSON program!",
    status: "canceled",
    label: "bug",
    priority: "medium",
  },
  {
    id: "TASK-3939",
    title:
      "Use the back-end SQL firewall, then you can connect the neural hard drive!",
    status: "done",
    label: "feature",
    priority: "low",
  },
  {
    id: "TASK-2007",
    title:
      "I'll input the back-end USB protocol, that should bandwidth the PCI system!",
    status: "backlog",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-7516",
    title:
      "Use the primary SQL program, then you can generate the auxiliary transmitter!",
    status: "done",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-6906",
    title:
      "Try to back up the DRAM system, maybe it will reboot the online transmitter!",
    status: "done",
    label: "feature",
    priority: "high",
  },
  {
    id: "TASK-5207",
    title:
      "The SMS interface is down, copy the bluetooth bus so we can quantify the VGA card!",
    status: "in progress",
    label: "bug",
    priority: "low",
  },
];
