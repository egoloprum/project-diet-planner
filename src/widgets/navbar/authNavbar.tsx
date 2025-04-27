import React from 'react'

import { LogoutBtn } from '@/src/features/logout-btn'

import {
  ListItem,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '../../shared/ui/navigation-menu'

export const AuthNavbar = () => {
  const plannerLinks: { title: string; href: string; description: string }[] = [
    {
      title: 'Planner',
      href: '/planner',
      description:
        'A modal dialog that interrupts the user with important content and expects a response.'
    },
    {
      title: 'Discover',
      href: '/discover',
      description:
        'For sighted users to preview content available behind a link.'
    },
    {
      title: 'Primary Diet',
      href: '/primary-diet',
      description:
        'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.'
    },
    {
      title: 'Food Exclusions',
      href: '/food-exclusions',
      description: 'Visually or semantically separates content.'
    },
    {
      title: 'Planner Settings',
      href: '/planner-settings',
      description:
        'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.'
    }
  ]

  const accountLinks: { title: string; href: string; description: string }[] = [
    {
      title: 'Profile',
      href: '/profile',
      description:
        'A modal dialog that interrupts the user with important content and expects a response.'
    },
    {
      title: 'User Settings',
      href: '/profile-settings',
      description:
        'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.'
    }
  ]

  const blogLinks: { title: string; href: string; description: string }[] = [
    {
      title: 'Blog',
      href: '/blog',
      description:
        'A modal dialog that interrupts the user with important content and expects a response.'
    },
    {
      title: 'Custom Recipe',
      href: '/custom-recipe',
      description:
        'For sighted users to preview content available behind a link.'
    },
    {
      title: 'Collections',
      href: '/collections',
      description:
        'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.'
    },
    {
      title: 'Saved Plans',
      href: '/saved-plans',
      description: 'Visually or semantically separates content.'
    },
    {
      title: 'Blog Settings',
      href: '/blog-settings',
      description:
        'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.'
    }
  ]

  return (
    <NavigationMenu className="min-h-[60px] h-full">
      <NavigationMenuList className="flex flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Planner</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid max-w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {plannerLinks.map(link => (
                <ListItem key={link.title} title={link.title} href={link.href}>
                  {link.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Account</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid max-w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {accountLinks.map(link => (
                <ListItem key={link.title} title={link.title} href={link.href}>
                  {link.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid max-w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {blogLinks.map(link => (
                <ListItem key={link.title} title={link.title} href={link.href}>
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
