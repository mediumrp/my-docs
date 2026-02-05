// app/components/ArticleNavigation.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { navigation, NavItem } from '../lib/navigation';

interface FlatNavItem {
  href: string;
  title: string;
  category: string;
  isChild: boolean;
}

function flattenNavigation(items: NavItem[]): FlatNavItem[] {
  const result: FlatNavItem[] = [];
  
  for (const item of items) {
    if (item.href) {
      result.push({
        href: item.href,
        title: item.title,
        category: item.title,
        isChild: false,
      });
    }
    
    if (item.children) {
      for (const child of item.children) {
        if (child.href) {
          result.push({
            href: child.href,
            title: child.title,
            category: item.title,
            isChild: true,
          });
        }
      }
    }
  }
  
  return result;
}

export function ArticleNavigation() {
  const pathname = usePathname();
  
  const articles = flattenNavigation(navigation);
  
  const normalizedPathname = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;
  
  const currentIndex = articles.findIndex(article => {
    const normalizedHref = article.href.endsWith('/') && article.href !== '/'
      ? article.href.slice(0, -1)
      : article.href;
    return normalizedHref === normalizedPathname;
  });

  if (currentIndex === -1) {
    return null;
  }

  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  if (!prevArticle && !nextArticle) {
    return null;
  }

  const linkStyles = `
    flex-1 group flex items-center gap-3 p-4 rounded-xl 
    border-2 border-gray-400 dark:border-gray-700 
    bg-white dark:bg-gray-900/50
    shadow-md dark:shadow-none
    hover:border-indigo-500 dark:hover:border-indigo-600 
    hover:bg-indigo-50 dark:hover:bg-indigo-950/30 
    hover:shadow-lg dark:hover:shadow-none
    transition-all
  `;

  return (
    <nav className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row items-stretch gap-4">
        {prevArticle ? (
          <Link href={prevArticle.href} className={linkStyles}>
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors shrink-0" />
            <div className="text-left min-w-0">
              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Назад
              </div>
              <div className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                {prevArticle.title}
              </div>
              {prevArticle.isChild && (
                <div className="text-xs text-gray-500 mt-0.5 truncate">
                  {prevArticle.category}
                </div>
              )}
            </div>
          </Link>
        ) : (
          <div className="flex-1 hidden sm:block" />
        )}

        {nextArticle ? (
          <Link href={nextArticle.href} className={`${linkStyles} justify-end`}>
            <div className="text-right min-w-0">
              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Далее
              </div>
              <div className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                {nextArticle.title}
              </div>
              {nextArticle.isChild && (
                <div className="text-xs text-gray-500 mt-0.5 truncate">
                  {nextArticle.category}
                </div>
              )}
            </div>
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors shrink-0" />
          </Link>
        ) : (
          <div className="flex-1 hidden sm:block" />
        )}
      </div>
    </nav>
  );
}