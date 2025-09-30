<?php

namespace App\Filament\Resources\Courses\Pages;

use App\Filament\Resources\Courses\CourseResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCourse extends EditRecord
{
    protected static string $resource = CourseResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        // Filter out empty modules and lessons for updates too
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
