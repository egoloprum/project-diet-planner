import {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/src/shared/ui'

export const Navbar = () => {
  return (
    <NavigationMenu className="max-h-[60px] h-full">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/"
            className={`${navigationMenuTriggerStyle()} rounded-xl`}>
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/docs"
            className={`${navigationMenuTriggerStyle()} rounded-xl`}>
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/login"
            className={`${navigationMenuTriggerStyle()} rounded-xl`}>
            Log in
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
