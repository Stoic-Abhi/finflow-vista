import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  CreditCard, 
  Target, 
  TrendingUp, 
  Settings, 
  Bell,
  Menu,
  X,
  Wallet,
  PiggyBank
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'Transactions',
    href: '/transactions',
    icon: CreditCard,
  },
  {
    name: 'Budgets',
    href: '/budgets',
    icon: Wallet,
  },
  {
    name: 'Goals',
    href: '/goals',
    icon: Target,
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: TrendingUp,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]

interface SidebarProps {
  className?: string
  isMobileOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ className, isMobileOpen = false, onClose }: SidebarProps) {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "flex flex-col bg-gradient-to-b from-card via-card to-muted/20 border-r border-border/50 transition-all duration-300 backdrop-blur-sm",
        "fixed lg:relative inset-y-0 left-0 z-50 shadow-xl",
        isCollapsed ? "w-16" : "w-64",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        className
      )}>
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-border/50 bg-gradient-to-r from-transparent to-primary/5">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
            <PiggyBank className="w-6 h-6 text-white drop-shadow-sm" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-savings bg-clip-text text-transparent">
                FinFlow Vista
              </h1>
              <p className="text-xs text-muted-foreground">Personal Finance</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                isActive
                  ? "gradient-primary text-white shadow-lg scale-105 border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-muted hover:to-muted/50 hover:scale-102",
                isCollapsed && "justify-center px-2"
              )}
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Icon className={cn("w-5 h-5 relative z-10", !isCollapsed && "mr-3")} />
              {!isCollapsed && <span className="relative z-10">{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-border/50 bg-gradient-to-r from-transparent to-success/5">
        <div className={cn(
          "flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer",
          isCollapsed && "justify-center"
        )}>
          <div className="w-10 h-10 gradient-success rounded-full flex items-center justify-center shadow-md">
            <span className="text-sm font-bold text-white drop-shadow-sm">U</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">John Doe</p>
              <p className="text-xs text-success truncate">Premium Member</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}