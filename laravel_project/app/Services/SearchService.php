<?php

namespace App\Services;

class SearchService
{
    public function Search($request, $model, $column)
    {
        $amodel = resolve($model);

        $results = $amodel::select($column)
            ->where($column, 'REGEXP', $request->data)
            ->distinct()
            ->pluck($column)
            ->toArray();
        return $results;
    }
}