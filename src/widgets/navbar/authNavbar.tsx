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
      description: 'Plan and organize your meals and recipes for the week.'
    },
    {
      title: 'Discover',
      href: '/discover',
      description: 'Explore new recipes, ingredients, and cooking inspiration.'
    },
    {
      title: 'Primary Diet',
      href: '/primary-diet',
      description: 'Set and manage your dietary preferences and restrictions.'
    },
    {
      title: 'Food Exclusions',
      href: '/food-exclusions',
      description:
        'Specify ingredients and foods you want to avoid in your meal planning.'
    }
  ]

  const accountLinks: { title: string; href: string; description: string }[] = [
    {
      title: 'Profile',
      href: '/profile',
      description: 'View nutritional values and selected menu of meals.'
    },
    {
      title: 'User Settings',
      href: '/profile-settings',
      description:
        'Edit personal data such as height and weight which will affect your nutritional values.'
    }
  ]

  const blogLinks: { title: string; href: string; description: string }[] = [
    {
      title: 'Blog',
      href: '/blog',
      description:
        'Read articles about cooking, nutrition, and meal planning tips.'
    },
    {
      title: 'Custom Recipe',
      href: '/custom-recipe',
      description: 'Create and save your own custom recipes.'
    },
    {
      title: 'Collections',
      href: '/collections',
      description: 'Organize and manage your favorite recipes and meal plans.'
    }
    // {
    //   title: 'Saved Plans',
    //   href: '/saved-plans',
    //   description: 'Visually or semantically separates content.'
    // }
  ]

  return (
    <NavigationMenu className="min-h-[60px] h-full">
      <NavigationMenuList className="flex flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="rounded-xl">
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
          <NavigationMenuTrigger className="rounded-xl">
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
          <NavigationMenuTrigger className="rounded-xl">
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
