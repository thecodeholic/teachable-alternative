<?php

namespace App\Filament\Widgets;

use App\Models\Course;
use App\Models\Module;
use App\Models\Lesson;
use App\Models\LessonVideo;
use App\Models\LessonAttachment;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class CourseStatsWidget extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Courses', Course::count())
                ->description('All courses in the system')
                ->descriptionIcon('heroicon-m-academic-cap')
                ->color('success'),

            Stat::make('Published Courses', Course::where('published', true)->count())
                ->description('Courses available to students')
                ->descriptionIcon('heroicon-m-eye')
                ->color('info'),

            Stat::make('Total Modules', Module::count())
                ->description('Course modules created')
                ->descriptionIcon('heroicon-m-squares-2x2')
                ->color('warning'),

            Stat::make('Total Lessons', Lesson::count())
                ->description('Lessons across all modules')
                ->descriptionIcon('heroicon-m-play')
                ->color('primary'),

            Stat::make('Total Videos', LessonVideo::count())
                ->description('Video files uploaded')
                ->descriptionIcon('heroicon-m-video-camera')
                ->color('danger'),

            Stat::make('Total Attachments', LessonAttachment::count())
                ->description('Files attached to lessons')
                ->descriptionIcon('heroicon-m-paper-clip')
                ->color('gray'),
        ];
    }
}
