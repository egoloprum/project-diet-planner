import { createClient } from "@/src/app/db/supabase"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../shared/ui/navigation-menu"
import { LogoutBtn } from "@/src/features/logoutBtn"

export const Navbar = async () => {
  const supabase = await createClient()
  const {data} = await supabase.auth.getUser()

  return (
    <NavigationMenu className="max-h-[60px] h-full">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href='/' className={navigationMenuTriggerStyle()}>
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavigationMenuLink href='/docs' className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
        </NavigationMenuItem>
        { data.user ? (
          <NavigationMenuItem>
            <LogoutBtn />
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem>
              <NavigationMenuLink href='/login' className={navigationMenuTriggerStyle()}>
                Log in 
              </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
