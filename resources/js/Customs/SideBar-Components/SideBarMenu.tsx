'use client';

import { SideBarButton } from '@/Customs/SideBar-Components/SideBarButton';
import { SidebarItems } from '@/types/sidebar-items';
import { Separator } from '@/Components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import Link from "next/link"
import {
  CalendarClock,
  CalendarX2,
  ChartAreaIcon,
  ChartNetworkIcon,
  Coins,
  FileArchiveIcon,
  FileIcon,
  Home,
  HouseIcon,
  LogOut,
  MailQuestionIcon,
  Printer,
  Settings,
  UserCheck,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/Components/ui/tooltip"
import ActiveLink from './ActiveLink';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/Components/ui/alert-dialog';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { ThemesSwitcher } from '../Themes/Themes-Selector';
import { THEMES } from '@/lib/themes';
import { ThemesStyle } from '../Themes/Themes-Style';

interface SideBarDesktopProps {
  sidebarItems: SidebarItems;
}
export function SideBarMenu(props: SideBarDesktopProps) {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState<boolean>(false)
  return (
    <>
      <ThemesStyle />
      <aside className="fixed inset-y-0 left-0 z-10 flex-col hidden border-r themes-wrapper w-14 bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Popover>
            <PopoverTrigger asChild>
              <Link href="#"
                className="flex items-center justify-center w-8 h-8 gap-2 text-lg font-semibold rounded-full group shrink-0 bg-primary text-primary-foreground md:h-8 md:w-8 md:text-base"
              >
                <Avatar className='w-full h-full transition-all group-hover:scale-110'>
                  <AvatarImage src="data:image/jpeg;base64,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" />
                  <AvatarFallback>JC</AvatarFallback>
                </Avatar>
                <span className="sr-only">Jerome Cafranca</span>
              </Link>
            </PopoverTrigger>
            <PopoverContent className='mt-2 ml-5 w-60 p-0 rounded-[0.8rem]'>
              <div className="flex flex-col p-2 pb-1 mt-2 ml-3 space-y-1">
                <p className="text-sm font-medium leading-none">Cafranca, Jerome E.</p>
                <p className="text-xs leading-none text-muted-foreground">
                  jerome.cafranca@ddcgroup.asia
                </p>
              </div>
              <Separator className="w-full my-3 mb-1" />
              <div className='pb-1 mt-2 space-y-1'>
                <div className='mx-2 my-2 space-y-1'>
                  <SideBarButton size='sm' icon={UserCheck} className='w-full'>
                    Profile
                  </SideBarButton>
                  <SideBarButton size='sm' icon={Settings} className='w-full'>
                    Account Settings
                  </SideBarButton>
                  <SideBarButton size='sm' icon={FileArchiveIcon} className='w-full'>
                    Generate Report
                  </SideBarButton>
                </div>
                <Separator className="w-full my-5" />
                <div className='pb-2 mx-2'>
                  <SideBarButton size='sm' icon={LogOut} className='w-full' onClick={() => setIsAlertDialogOpen(true)}>
                    Log Out
                  </SideBarButton>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Tooltip>
            <TooltipTrigger>
              <ActiveLink href='dashboard' title='Dashboard'>
                <ChartAreaIcon className="w-5 h-5" />
              </ActiveLink>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <ActiveLink href='home' title='Home'>
                <HouseIcon className="w-5 h-5" />
              </ActiveLink>
            </TooltipTrigger>
            <TooltipContent side="right">Home</TooltipContent>
          </Tooltip>
        </nav>
        <nav className="flex flex-col items-center gap-4 px-2 mt-auto sm:py-5">
          <Tooltip>
            <TooltipTrigger>
              <Link
                href="#"
                className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8"
              >
                <span className="sr-only">Payslip</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Payslip</TooltipContent>
          </Tooltip>

          <ThemesSwitcher themes={THEMES} />
          <Tooltip>
            <TooltipTrigger>
              <ActiveLink href='settings' title='Settings'>
                <Settings className="w-5 h-5" />
              </ActiveLink>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
          
        </nav>
      </aside>
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ready to Leave?</AlertDialogTitle>
            <AlertDialogDescription>
              Select "Logout" below if you are ready to end your current session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAlertDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => router.post(route("logout"))}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}