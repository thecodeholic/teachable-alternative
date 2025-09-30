<?php

namespace App\Filament\Resources\Courses\Pages;

use App\Filament\Resources\Courses\CourseResource;
use Filament\Resources\Pages\CreateRecord;

class CreateCourse extends CreateRecord
{
    protected static string $resource = CourseResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['user_id'] = auth()->id();

        // Filter out empty modules and lessons
        if (isset($data['modules'])) {
            $data['modules'] = array_filter($data['modules'], function ($module) {
                // Keep module if it has a title
                if (empty($module['title'])) {
                    return false;
                }

                // Filter out empty lessons within modules
                if (isset($module['lessons'])) {
                    $module['lessons'] = array_filter($module['lessons'], function ($lesson) {
                        return !empty($lesson['title']);
                    });
                }

                return true;
            });
        }

        return $data;
    }
}
