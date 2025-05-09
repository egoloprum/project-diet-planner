import React from 'react'

import { LogoutBtn } from '@/src/features/auth'
import {
  ListItem,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/src/shared/ui'

import { accountLinks, blogLinks, plannerLinks } from '../lib/data'

export const AuthNavbar = () => {
  return (
    <NavigationMenu className="min-h-[60px] h-full">
      <NavigationMenuList className="flex flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="rounded-xl text-base sm:text-lg md:text-xl">
            Planner
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid max-w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {plannerLinks.map(link => (
                <ListItem
                  key={link.title}
                  title={link.title}
                  href={link.href}
                  className="rounded-xl">
                  {link.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="rounded-xl text-base sm:text-lg md:text-xl">
            Account
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid max-w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {accountLinks.map(link => (
                <ListItem
                  key={link.title}
                  title={link.title}
                  href={link.href}
                  className="rounded-xl">
                  {link.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="rounded-xl text-base sm:text-lg md:text-xl">
            Blog
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid max-w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {blogLinks.map(link => (
                <ListItem
                  key={link.title}
                  title={link.title}
                  href={link.href}
                  className="rounded-xl">
                  {link.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <LogoutBtn />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
