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
        "flex flex-col bg-card border-r border-border transition-all duration-300",
        "fixed lg:relative inset-y-0 left-0 z-50",
        isCollapsed ? "w-16" : "w-64",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        className
      )}>
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <PiggyBank className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                FinFlow Vista
              </h1>
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
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
                isCollapsed && "justify-center"
              )}
            >
              <Icon className={cn("w-5 h-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-border">
        <div className={cn(
          "flex items-center space-x-3",
          isCollapsed && "justify-center"
        )}>
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">U</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">User</p>
              <p className="text-xs text-muted-foreground truncate">user@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}